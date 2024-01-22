import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LuChevronRight, LuSettings } from "react-icons/lu";

import { MenuButton } from "@/lib/components/Menu/components/MenuButton";
import { cn } from "@/lib/utils";

export const ParametersButton = (): JSX.Element => {
  const pathname = usePathname() ?? "";
  const isSelected = pathname.includes("/user");
  const { t } = useTranslation("chat");

  return (
    <Link href="/user">
      <MenuButton
        label={t("parameters")}
        startIcon={<LuSettings />}
        endIcon={<LuChevronRight size={18} />}
        className={cn(
          "w-full hover:bg-secondary py-3",
          isSelected ? "bg-secondary" : ""
        )}
      />
    </Link>
  );
};
