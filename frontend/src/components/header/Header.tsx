import { paths } from "@/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleDown } from "react-icons/fa6";
import headerStyles from "./Header.module.css";
import LinkItem from "./LinkItem";
import { HamburgerIcon } from "./hamburger";
import { LanguageSelector } from "./languageSelector";
import HeaderLogo from "./logo/HeaderLogo";

const Header = () => {
  //Case: Client Width too small:  When the user clicks on hamburger icon, open the menu
  const { t } = useTranslation("header");
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleMenu = () => {
    setOpen(!isOpen);
  };

  const iconDropdown = <FaAngleDown />;

  return (
    <header className={headerStyles["header-container"]}>
      <HeaderLogo />

      {/* Change Header to Hamburger Menu if client clicks on hamburger icon */}
      <nav className={`${headerStyles["menu-container"]} ${isOpen ? headerStyles.open : ""}`}>
        <nav className={headerStyles["dropdown-container"]}>
          <LinkItem className="menu-item" to={paths.mergeSort} text="SortSensei &nbsp;" icon={iconDropdown} />
          <nav className={headerStyles["dropdown-content"]}>
            <LinkItem className="menu-item" to={paths.mergeSort} text="MergeSort" />
            <LinkItem className="menu-item" to={paths.quickSort} text="QuickSort" />
            <LinkItem className="menu-item" to={paths.bubbleSort} text="BubbleSort" />
            <LinkItem className="menu-item" to={paths.selectionSort} text="SelectionSort" />
          </nav>
        </nav>
        <LinkItem className="menu-item" to={paths.treeTutor} text="TreeTutor" />
        <LinkItem className="menu-item" to={paths.tutorial} text={t("example")} />
        <LinkItem className="menu-item" to={paths.kontakt} text={t("contact")} />
      </nav>
      <LanguageSelector />
      <HamburgerIcon isOpen={isOpen} onClick={toogleMenu} />
    </header>
  );
};

export default Header;
