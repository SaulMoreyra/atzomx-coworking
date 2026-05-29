"use client";

import React, { Suspense } from "react";
import ProductFormScreen from "@/components/screens/admin/ProductFormScreen/ProductFormScreen";
import ProductFormScreenFallback from "@/components/screens/admin/ProductFormScreen/ProductFormScreenFallback";

export default function NewProductPage() {
  return (
    <Suspense fallback={<ProductFormScreenFallback />}>
      <ProductFormScreen />
    </Suspense>
  );
}
