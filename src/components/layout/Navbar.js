import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

import logo from "../../img/costs_logo.png";

import Container from "./Container";

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs logo" />
        </Link>

        <ul className={styles.list}>
          <li className={styles.items}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.items}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={styles.items}>
            <Link to="/contact">Contato</Link>
          </li>
          <li className={styles.items}>
            <Link to="/company">Empresa</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
