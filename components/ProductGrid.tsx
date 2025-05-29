"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { Loader2 } from "lucide-react";

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
        // setProducts(response); This also works
        setProducts(await response);
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, params, query]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <div className="flex items-center gap-x-2 text-blue-600">
            <Loader2 className="animate-spin" />
            <span className="text-lg font-semibold">Product is loading...</span>
          </div>
        </div>
      ) : (
        <>
          {products?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
              {products.map((product) => (
                <AnimatePresence key={product._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <NoProductAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

// sanity types: 3hr 35min
// pnpm run typegen: extract my schema from sanity and generate the types: (sanity.types.ts)
