import { revalidateTag } from "next/cache";

export function revalidateProductCaches() {
  revalidateTag("menu");
  revalidateTag("plans");
  revalidateTag("products");
}
