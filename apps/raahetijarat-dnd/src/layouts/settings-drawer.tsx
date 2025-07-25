"use client";

import LayoutSwitcher from "@/layouts/layout-switcher";
import EnvatoIcon from "@core/components/icons/envato";
import { Button } from "rizzui";
import ColorOptions from "./settings/color-options";
import ThemeSwitcher from "./settings/theme-switcher";

export default function SettingsDrawer() {
  return (
    <>
      <div className="custom-scrollbar overflow-y-auto scroll-smooth h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          <ThemeSwitcher />
          <LayoutSwitcher />
          <ColorOptions />
        </div>
      </div>

      <SettingsFooterButton />
    </>
  );
}

function SettingsFooterButton() {
  return (
    <a
      href="https://themeforest.net/item/raahetijarat-react-redux-admin-dashboard/20262330?ref=redqteam"
      target="_blank"
      className="grid grid-cols-1 border-t border-muted px-6 pt-4"
    >
      <Button size="lg" as="span" className={"text-base font-semibold"}>
        <EnvatoIcon className="me-2 h-5 w-5" />
        <span className="">Purchase for $24</span>
      </Button>
    </a>
  );
}
