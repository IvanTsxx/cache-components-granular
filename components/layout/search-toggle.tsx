"use client";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface SearchToggleProps
  extends Omit<ComponentProps<"button">, "color">, ButtonProps {
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  hideIfDisabled,
  size = "icon-sm",
  color = "ghost",
  ...props
}: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) {
    return null;
  }

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          color,
          size,
        }),
        props.className
      )}
      data-search=""
      aria-label="Open Search"
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) {
    return null;
  }

  return (
    <button
      type="button"
      data-search-full=""
      {...props}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring",
        props.className
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd key={i} className="rounded-md border bg-fd-background px-1.5">
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
