import React, { Suspense } from "react";
import ProductFormScreen from "@/components/screens/admin/ProductFormScreen/ProductFormScreen";
import ProductFormScreenFallback from "@/components/screens/admin/ProductFormScreen/ProductFormScreenFallback";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProductFormScreenFallback />}>
      <ProductFormScreen productId={id} />
    </Suspense>
  );
}
