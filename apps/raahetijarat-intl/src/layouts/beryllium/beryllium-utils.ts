"use client";

import { atom, useAtom } from "jotai";
import { MenuItemsType } from "@/layouts/beryllium/beryllium-fixed-menu-items";

const LOCAL_STORAGE_KEY = "iso-beryllium-sidebar-left-expanded";

const raahetijaratBerylliumSidebarLeftExpandedAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : true
);

const raahetijaratBerylliumSidebarLeftExpandedAtomWithPersistence = atom(
  (get) => get(raahetijaratBerylliumSidebarLeftExpandedAtom),
  (get, set, newStorage: any) => {
    set(raahetijaratBerylliumSidebarLeftExpandedAtom, newStorage);
    localStorage.setItem(LOCAL_STORAGE_KEY, newStorage);
  }
);

export function useBerylliumSidebars() {
  const [expandedLeft, setExpandedLeft] = useAtom(
    raahetijaratBerylliumSidebarLeftExpandedAtomWithPersistence
  );

  return {
    expandedLeft: !!(expandedLeft === null ? true : JSON.parse(expandedLeft as string)),
    setExpandedLeft,
  };
}

export function getActiveMainMenuIndex(pathname: string, menuItems: MenuItemsType[]) {
  let activeIndex = 0;
  for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    for (let j = 0; j < menuItem.menuItems.length; j++) {
      const items = menuItem.menuItems[j];
      if (items.href === pathname) {
        activeIndex = i;
        break;
      } else {
        if (items.subMenuItems) {
          for (let k = 0; k < items.subMenuItems.length; k++) {
            const subMenuItem = items.subMenuItems[k];
            if (subMenuItem.href === pathname) {
              activeIndex = i;
              break;
            }
          }
        }
      }
    }
  }
  return activeIndex;
}

export function removeFirstLetters(length: number, str: string) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }
  return str.slice(length);
}
