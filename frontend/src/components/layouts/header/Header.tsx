import { paths } from "@/config/paths";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleDown, FaAngleLeft } from "react-icons/fa6";
import headerStyles from "./Header.module.css";
import { LinkItem } from "./LinkItem";
import { HamburgerIcon } from "./hamburger";
import { LanguageSelector } from "./languageSelector";
import { HeaderLogo } from "./logo";

const Header = () => {
  const { t } = useTranslation("header");
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const iconDropdown = <FaAngleDown className={headerStyles["dropdown-icon"]} />;
  const iconSide = <FaAngleLeft className={headerStyles["dropdown-icon"]} />;

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

        <nav className={headerStyles["dropdown-container"]}>
          <LinkItem
            className={headerStyles["menu-item"]}
            to={paths.mergesorttutorial}
            text={t("example")}
            icon={iconDropdown}
          />

          <nav className={headerStyles["dropdown-content"]}>
            <div className={headerStyles["nested-dropdown"]}>
              <LinkItem
                className={headerStyles["dropdown-menu-item"]}
                to={paths.mergesorttutorial}
                text="SortSensei"
                icon={iconSide}
              />
              <nav className={headerStyles["nested-dropdown-content"]}>
                <LinkItem className={headerStyles["menu-item"]} to={paths.mergesorttutorial} text="MergeSort" />
                <LinkItem className={headerStyles["menu-item"]} to={paths.bubblesorttutorial} text="BubbleSort" />
                <LinkItem className={headerStyles["menu-item"]} to={paths.selectionsorttutorial} text="SelectionSort" />
                <LinkItem className={headerStyles["menu-item"]} to={paths.quicksorttutorial} text="QuickSort" />
              </nav>
            </div>

            <LinkItem className={headerStyles["menu-item"]} to={paths.l_rotatetutorial} text="Tree Tutor" />
          </nav>
        </nav>

        <LinkItem className={headerStyles["menu-item"]} to={paths.kontakt} text={t("contact")} />
      </nav>
      {/* <HelpIcon onClick={closeModal} /> */}
      <LanguageSelector />
      <HamburgerIcon isOpen={isOpen} onClick={toggleMenu} />
    </header>
  );
};

export default Header;
