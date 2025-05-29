import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { Minus, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("Quantity decreased successfully");
    } else {
      toast.success(
        `${product.name?.substring(0, 12)}... removed successfully`
      );
    }
  };

  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-6"
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="size-6"
        onClick={() => {
          addItem(product);
          toast.success(
            `${product.name?.substring(0, 12)}... added successfully`
          );
        }}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default QuantityButtons;
