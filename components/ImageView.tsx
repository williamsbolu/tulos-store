"use client";

import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface ImageViewProps {
  images: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
}

const ImageView = ({ images = [] }: ImageViewProps) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            alt="Product image"
            width={700}
            height={700}
            priority
            className="w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md"
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images.map((image) => (
          <button
            key={image._key}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden hover:cursor-pointer ${
              active._key === image._key ? "ring-1 ring-darkColor" : ""
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
