import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.Footer}>
      <ul className={styles.list_socialmidia}>
        <li className={styles.items}>
          <FaFacebook />
        </li>
        <li className={styles.items}>
          <FaInstagram />
        </li>
        <li className={styles.items}>
          <FaLinkedin />
        </li>
      </ul>
      <p className={styles.copy}>
        <span>Joabe Felipe</span> &copy; 2026
      </p>
    </footer>
  );
}

export default Footer;
