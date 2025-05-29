import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Facebook, Instagram, Linkedin, Slack, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLinks = [
  {
    title: "Youtube",
    href: "/",
    icon: <Youtube className="size-5" />,
  },
  {
    title: "Instagram",
    href: "/",
    icon: <Instagram className="size-5" />,
  },
  {
    title: "LinkedIn",
    href: "/",
    icon: <Linkedin className="size-5" />,
  },
  {
    title: "Facebook",
    href: "/",
    icon: <Facebook className="size-5" />,
  },
  {
    title: "Slack",
    href: "/",
    icon: <Slack className="size-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLinks.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-white hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold",
                tooltipClassName
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
