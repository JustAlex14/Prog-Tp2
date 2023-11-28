"use client";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { ProductFilters } from "./product-filters";
import { ProductsCategoryData } from "tp-kit/types";
import { Button, ProductCardLayout, ProductGridLayout } from "tp-kit/components";
import { ProductFiltersResult } from "../types";
import { filterProducts } from "../utils/filter-products";
import Link from "next/link";
import { addLine } from "../hooks/use-cart";
import { AddToCartButton } from "./add-to-cart-button";

type Props = {
  categories: ProductsCategoryData[];
  showFilters?: boolean
};

const ProductList: FC<Props> = memo(function ({ categories, showFilters = false }) {
  const [filters, setFilters] = useState<ProductFiltersResult | undefined>();
  const [filteredCategories, setFilteredCategories] = useState<ProductsCategoryData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const filteredCategoriesData = async () => {
      setLoading(true);

      const params = new URLSearchParams()
      if (filters) {
        if (filters.search) {
          params.set("search", filters.search)
        }

        if (filters.categoriesSlugs.length) {
          filters.categoriesSlugs.map(cat => params.append("cat", cat))
        }
      }

      try {
        const resp = await fetch(`/api/product-filters?${params.toString()}`)
        const output = await resp.json();
        setFilteredCategories(output.categories);
      }
      catch (error) {
        console.error('Error when laoding the data', error);
      } finally {
        setLoading(false);
      }
    };

    filteredCategoriesData();
  }, [filters]);

  return (
    <div className="flex flex-row gap-8">
      {/* Filters */}
      {showFilters && <div className="w-full max-w-[270px]">
        <ProductFilters categories={categories} onChange={setFilters} />
      </div>}

      {/* Grille Produit */}
      <div className="flex-1 space-y-24">
        {isLoading ? <p>Loading</p> : filteredCategories.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-lg font-semibold mb-8 tracking-tight">
              <Link href={`/${cat.slug}`} className="link">{cat.name} ({cat.products.length})</Link>
            </h2>

            <ProductGridLayout products={cat.products}>
              {(product) => (
                <ProductCardLayout
                  product={product}
                  button={
                    <AddToCartButton product={product} />
                  }
                />
              )}
            </ProductGridLayout>
          </section>
        ))}
      </div>
    </div>
  );
});

ProductList.displayName = "ProductList";
export { ProductList };
