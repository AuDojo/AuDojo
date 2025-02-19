import { paths } from "@/config";
import { lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import headerStyles from "./Header.module.css";
import { LinkItem } from "./LinkItem";
import { HamburgerIcon } from "./hamburger";
import { LanguageSelector } from "./languageSelector";
import { HeaderLogo } from "./logo";

const FaAngleDown = lazy(() => import("react-icons/fa6").then((module) => ({ default: module.FaAngleDown })));

const Header = () => {
  const { t } = useTranslation("header");
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const iconDropdown = <FaAngleDown className={headerStyles["dropdown-icon"]} />;

  return (
    <header className={headerStyles["header-container"]}>
      <HeaderLogo />

      {/* Change Header to Hamburger Menu if client clicks on hamburger icon */}
      <nav className={`${headerStyles["menu-container"]} ${isOpen && headerStyles.open}`}>
        <nav className={headerStyles["dropdown-container"]}>
          <LinkItem
            className={headerStyles["menu-item"]}
            to={paths.mergeSort}
            text="SortSensei &nbsp;"
            icon={iconDropdown}
          />
          <nav className={headerStyles["dropdown-content"]}>
            <LinkItem className={headerStyles["menu-item"]} to={paths.mergeSort} text="MergeSort" />
            <LinkItem className={headerStyles["menu-item"]} to={paths.quickSort} text="QuickSort" />
            <LinkItem className={headerStyles["menu-item"]} to={paths.bubbleSort} text="BubbleSort" />
            <LinkItem className={headerStyles["menu-item"]} to={paths.selectionSort} text="SelectionSort" />
          </nav>
        </nav>
        <LinkItem className={headerStyles["menu-item"]} to={paths.treeTutor} text="TreeTutor" />
        <LinkItem className={headerStyles["menu-item"]} to={paths.tutorial} text={t("example")} />
        <LinkItem className={headerStyles["menu-item"]} to={paths.kontakt} text={t("contact")} />
      </nav>
      {/* <HelpIcon onClick={closeModal} /> */}
      <LanguageSelector />
      <HamburgerIcon isOpen={isOpen} onClick={toggleMenu} />
    </header>
  );
};

export default Header;
