import React from "react";
import { db } from "../_lib/prisma";
import { CategoryItem } from "./category-item";

export async function CategoryList() {
  const categories = await db.category.findMany();

  return (
    <div className="flex gap-3 overflow-x-scroll pb-1">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
