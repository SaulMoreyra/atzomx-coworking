import { z } from "zod";
import { PlanArea, ProductType, UserRole } from "@prisma/client";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const variantInputSchema = z.object({
  slug: z.string().min(1).max(64),
  price: z.number().min(0),
  sortOrder: z.number().int().min(0).optional(),
});

export const featureInputSchema = z.object({
  featureKey: z.string().min(1).max(128),
  sortOrder: z.number().int().min(0).optional(),
});

export const createProductSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  type: z.nativeEnum(ProductType),
  categoryId: z.string().cuid().optional().nullable(),
  basePrice: z.number().min(0),
  image: z.string().max(512).optional().nullable(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  planArea: z.nativeEnum(PlanArea).optional().nullable(),
  variants: z.array(variantInputSchema).optional(),
  features: z.array(featureInputSchema).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createCategorySchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.nativeEnum(ProductType),
  sortOrder: z.number().int().min(0).optional(),
  active: z.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120).optional(),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole).optional(),
  active: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(120).optional().nullable(),
  password: z.string().min(8).optional(),
  role: z.nativeEnum(UserRole).optional(),
  active: z.boolean().optional(),
});

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  type: z.nativeEnum(ProductType).optional(),
  category: z.string().optional(),
  active: z
    .enum(["true", "false"])
    .optional()
    .transform(v => (v === undefined ? undefined : v === "true")),
});

export const listCategoriesQuerySchema = z.object({
  type: z.nativeEnum(ProductType).optional(),
});
