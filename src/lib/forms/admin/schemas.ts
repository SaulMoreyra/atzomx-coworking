import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ValidationTranslator = (
  key: string,
  values?: Record<string, string | number>
) => string;

export function createLoginFormSchema(tv: ValidationTranslator) {
  return z.object({
    email: z.string().min(1, tv("emailRequired")).email(tv("emailInvalid")),
    password: z.string().min(8, tv("passwordMin")),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginFormSchema>>;

export function createCategoryFormSchema(tv: ValidationTranslator) {
  return z.object({
    slug: z
      .string()
      .min(1, tv("slugRequired"))
      .max(64)
      .regex(slugRegex, tv("slugFormat")),
  });
}

export type CategoryFormValues = z.infer<ReturnType<typeof createCategoryFormSchema>>;

export function createUserFormSchema(tv: ValidationTranslator) {
  return z.object({
    email: z.string().min(1, tv("emailRequired")).email(tv("emailInvalid")),
    name: z.string().max(120).optional(),
    password: z.string().min(8, tv("passwordMin")),
    role: z.enum(["ADMIN", "STAFF"]),
  });
}

export type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;

const variantFormSchema = z.object({
  slug: z.string(),
  price: z.string(),
});

export function createProductFormSchema(tv: ValidationTranslator) {
  return z
    .object({
      slug: z
        .string()
        .min(1, tv("slugRequired"))
        .max(64)
        .regex(slugRegex, tv("slugFormat")),
      type: z.enum(["MENU", "PLAN"]),
      basePrice: z.string().min(1, tv("priceRequired")),
      image: z.string(),
      active: z.boolean(),
      sortOrder: z.string(),
      categoryId: z.string(),
      planArea: z.enum(["cafeteria", "co_working", "meeting_room"]),
      variants: z.array(variantFormSchema),
      featureKeysText: z.string(),
    })
    .superRefine((data, ctx) => {
      const basePrice = Number(data.basePrice);
      if (Number.isNaN(basePrice) || basePrice < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tv("priceInvalid"),
          path: ["basePrice"],
        });
      }

      if (data.type === "MENU" && !data.categoryId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tv("categoryRequired"),
          path: ["categoryId"],
        });
      }
    });
}

export type ProductFormValues = z.infer<ReturnType<typeof createProductFormSchema>>;
