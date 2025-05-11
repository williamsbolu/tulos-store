import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  classname?: string;
}

const Logo = ({ children, classname }: Props) => {
  return (
    <Link href="/">
      <h2
        className={cn(
          "text-2xl text-darkColor font-black tracking-wider uppercase",
          classname
        )}
      >
        {children}
      </h2>
    </Link>
  );
};

export default Logo;
