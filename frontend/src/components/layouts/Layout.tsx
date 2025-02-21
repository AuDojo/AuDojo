import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles["main"]}>{children}</main>
      <Footer />
    </>
  );
};
