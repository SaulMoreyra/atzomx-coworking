import { unstable_cache } from "next/cache";
import { getPublicPlansApiResponse } from "@/lib/products/public-products";
import { jsonOk } from "@/lib/auth/require-auth";

const getCachedPlans = unstable_cache(
  async () => {
    return await getPublicPlansApiResponse();
  },
  ["public-plans"],
  { tags: ["plans", "products"], revalidate: 60 }
);

export async function GET() {
  const items = await getCachedPlans();
  return jsonOk({ items });
}
