import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

export default function Layout() {
  return (
    <main className={styles.main_section}>
      <Outlet />
    </main>
  );
}
