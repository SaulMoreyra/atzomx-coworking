import {
  PlanArea,
  PrismaClient,
  ProductType,
  UserRole,
} from "@prisma/client";
import { ALL_FOODS } from "../src/mocks/menu";
import { ALL_PLANS } from "../src/mocks/products";
import { hashPassword } from "../src/lib/auth/password";
import { mapLegacyPlanArea } from "../src/lib/api/serializers";

const prisma = new PrismaClient();

const MENU_CATEGORY_ORDER = [
  "coffee",
  "lunch",
  "dessert",
  "smoothies",
  "frappes",
  "extras",
];

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@atzomx.com.mx";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      role: UserRole.ADMIN,
      passwordHash: await hashPassword(adminPassword),
    },
  });

  for (let i = 0; i < MENU_CATEGORY_ORDER.length; i++) {
    const slug = MENU_CATEGORY_ORDER[i];
    await prisma.category.upsert({
      where: { slug },
      update: { sortOrder: i, type: ProductType.MENU, active: true },
      create: {
        slug,
        type: ProductType.MENU,
        sortOrder: i,
        active: true,
      },
    });
  }

  const categories = await prisma.category.findMany({
    where: { type: ProductType.MENU },
  });
  const categoryBySlug = new Map(categories.map(c => [c.slug, c.id]));

  for (let index = 0; index < ALL_FOODS.length; index++) {
    const food = ALL_FOODS[index];
    const categoryId = categoryBySlug.get(food.category);

    await prisma.product.upsert({
      where: { slug: food.id },
      update: {
        type: ProductType.MENU,
        categoryId,
        basePrice: food.price,
        image: food.image,
        active: true,
        sortOrder: index,
      },
      create: {
        slug: food.id,
        type: ProductType.MENU,
        categoryId,
        basePrice: food.price,
        image: food.image,
        active: true,
        sortOrder: index,
      },
    });

    const product = await prisma.product.findUniqueOrThrow({
      where: { slug: food.id },
    });

    await prisma.productVariant.deleteMany({ where: { productId: product.id } });

    if (food.variants.length > 0) {
      await prisma.productVariant.createMany({
        data: food.variants.map((variant, variantIndex) => ({
          productId: product.id,
          slug: variant.name,
          price: variant.price,
          sortOrder: variantIndex,
        })),
      });
    }
  }

  for (let index = 0; index < ALL_PLANS.length; index++) {
    const plan = ALL_PLANS[index];

    await prisma.product.upsert({
      where: { slug: plan.id },
      update: {
        type: ProductType.PLAN,
        basePrice: plan.startPrice,
        planArea: mapLegacyPlanArea(plan.area) as PlanArea,
        active: true,
        sortOrder: index,
        categoryId: null,
      },
      create: {
        slug: plan.id,
        type: ProductType.PLAN,
        basePrice: plan.startPrice,
        planArea: mapLegacyPlanArea(plan.area) as PlanArea,
        active: true,
        sortOrder: index,
      },
    });

    const product = await prisma.product.findUniqueOrThrow({
      where: { slug: plan.id },
    });

    await prisma.planFeature.deleteMany({ where: { productId: product.id } });

    await prisma.planFeature.createMany({
      data: plan.features.map((featureKey, featureIndex) => ({
        productId: product.id,
        featureKey,
        sortOrder: featureIndex,
      })),
    });
  }

  console.log(`Seed complete. Admin: ${adminEmail}`);
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
