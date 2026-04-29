
import { Send, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const socials = [
  { 
    name: "X (Twitter)", 
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ), 
    href: "https://x.com/coompassio" 
  },
  { 
    name: "Medium", 
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ), 
    href: "https://coompass.medium.com/" 
  },
  { 
    name: "Telegram", 
    Icon: Send, 
    href: "https://t.me/coompass_official" 
  },
  { 
    name: "LinkedIn", 
    Icon: Linkedin, 
    href: "https://www.linkedin.com/company/coompass" 
  },
];

interface SidebarSocialsProps {
  isCollapsed: boolean;
}

export function SidebarSocials({ isCollapsed }: SidebarSocialsProps) {
  if (isCollapsed) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center justify-between px-6">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            className="text-black dark:text-gray-400 hover:bg-coompass-success/20 hover:text-coompass-success p-2 rounded-lg transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon ? (
              social.icon()
            ) : (
              <social.Icon className="h-4 w-4" />
            )}
            <span className="sr-only">{social.name}</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-4 text-xs text-black dark:text-gray-500">
        © Coompass 2026
      </div>
    </div>
  );
}
