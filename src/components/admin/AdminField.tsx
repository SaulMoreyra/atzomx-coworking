"use client";

import React from "react";

interface AdminFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}

export default function AdminField({ label, htmlFor, error, children }: AdminFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-label mb-2 block text-xs tracking-[0.12em]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
