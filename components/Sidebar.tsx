import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Logo from "./Logo";
import { headerData } from "@/constants";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-darkColor/50 shadow-xl hoverEffect w-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef} // to close the menu anytime we click outside the element
        className="min-w-72 max-w-96 bg-darkColor cursor-auto text-white/70 h-full p-10 border-r border-r-white flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <span onClick={onClose}>
            <Logo classname="text-white">Tulos</Logo>
          </span>

          <button className="hover:text-red-500 hoverEffect" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`hover:text-white hoverEffect w-24 relative ${
                pathname === item.href && "text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <SocialMedia />
      </motion.div>
    </div>
  );
};

export default Sidebar;
