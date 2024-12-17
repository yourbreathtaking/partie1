import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <span>
        <Image src="/assets/IMGS/favicon.ico" alt="Favicon" width={20} height={20} />
      </span>
      Seismaroc
    </div>
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#accueil" className={styles.navLink}>Accueil</a>
        </li>
        <li className={styles.navItem}>
          <a href="#catastrophe" className={styles.navLink}>À propos de la catastrophe</a>
        </li>
        <li className={styles.navItem}>
          <a href="#reference" className={styles.navLink}>Références</a>
        </li>
        <li className={styles.navItem}>
          <a href="#quisommesnous" className={styles.navLink}>Qui sommes-nous ?</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
