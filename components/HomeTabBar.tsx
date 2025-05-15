import { productType } from "@/constants";
import { Repeat } from "lucide-react";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ onTabSelect, selectedTab }: Props) => {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold">
      <div className="flex items-center gap-1.5">
        {productType.map((item) => (
          <button
            key={item.title}
            onClick={() => onTabSelect(item.title)}
            className={`border border-darkColor px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect ${
              selectedTab === item.title && "bg-darkColor text-white"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <button className="border border-darkColor rounded-full p-2 hover:bg-darkColor hover:text-white hoverEffect">
        <Repeat className="size-5" />
      </button>
    </div>
  );
};

export default HomeTabBar;
