"use client";

import { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0].title || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const query = `*[_type == "product" && variant == $variant] | order(name desc)`;
  const params = { variant: selectedTab.toLocaleLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
        // setProducts(await response);
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div>
          <span>Product is loading..</span>
        </div>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductGrid;

// sanity types: 3hr 35min
// pnpm run typegen: extract my schema from sanity and generate the types: (sanity.types.ts)
