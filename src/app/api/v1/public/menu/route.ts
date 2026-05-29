import { unstable_cache } from "next/cache";
import { getPublicMenuApiResponse } from "@/lib/products/public-products";
import { jsonOk } from "@/lib/auth/require-auth";

const getCachedMenu = unstable_cache(
  async () => {
    return await getPublicMenuApiResponse();
  },
  ["public-menu"],
  { tags: ["menu", "products"], revalidate: 60 }
);

export async function GET() {
  const items = await getCachedMenu();
  return jsonOk({ items });
}
