import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  classname?: string;
}

const Container = ({ children, classname }: Props) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4", classname)}>{children}</div>
  );
};

export default Container;
