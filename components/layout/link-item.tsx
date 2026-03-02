"use client";
import { usePathname } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import type { ComponentProps, ReactNode } from "react";

import { isActive } from "@/lib/urls";

export function useLinkItemActive(link: LinkItemType) {
  const pathname = usePathname();

  if (link.type === "custom" || !link.url) {
    return false;
  }
  if (link.active === "none") {
    return false;
  }

  return isActive(link.url, pathname, link.active === "nested-url");
}

interface Filterable {
  /**
   * Restrict where the item is displayed
   *
   * @default 'all'
   */
  on?: "menu" | "nav" | "all";
}

interface WithHref {
  url: string;
  /**
   * When the item is marked as active
   *
   * @default 'url'
   */
  active?: "url" | "nested-url" | "none";
  external?: boolean;
}

export interface MainItemType extends WithHref, Filterable {
  type?: "main";
  icon?: ReactNode;
  text: ReactNode;
  description?: ReactNode;
}

export interface IconItemType extends WithHref, Filterable {
  type: "icon";
  /**
   * `aria-label` of icon button
   */
  label?: string;
  icon: ReactNode;
  text: ReactNode;
  /**
   * @default true
   */
  secondary?: boolean;
}

export interface ButtonItemType extends WithHref, Filterable {
  type: "button";
  icon?: ReactNode;
  text: ReactNode;
  /**
   * @default false
   */
  secondary?: boolean;
}

export interface MenuItemType extends Partial<WithHref>, Filterable {
  type: "menu";
  icon?: ReactNode;
  text: ReactNode;

  items: (
    | (MainItemType & {
        /**
         * Options when displayed on navigation menu
         */
        menu?: ComponentProps<"a"> & {
          banner?: ReactNode;
        };
      })
    | CustomItemType
  )[];

  /**
   * @default false
   */
  secondary?: boolean;
}

export interface CustomItemType extends Filterable {
  type: "custom";
  /**
   * @default false
   */
  secondary?: boolean;
  children: ReactNode;
}

export type LinkItemType =
  | MainItemType
  | IconItemType
  | ButtonItemType
  | MenuItemType
  | CustomItemType;

export function LinkItem({
  ref,
  item,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { item: LinkItemType & WithHref }) {
  const active = useLinkItemActive(item);

  return (
    <Link
      ref={ref}
      href={item.url}
      external={item.external}
      {...props}
      data-active={active}
    >
      {props.children}
    </Link>
  );
}
