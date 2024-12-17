'use client'
import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

import SEISME1 from '@/app/public/IMGS/SEISME1.jpeg';
import SEISME2 from '@/app/public/IMGS/SEISME2.jpg';
import SEISME3 from '@/app/public/IMGS/SEISME3.jpg';
import SEISME4 from '@/app/public/IMGS/SEISME4.jpg';

const Hero: React.FC = () => (
  <section className={styles.hero}>
    <div className={styles.slideshow}>
      <div className={styles.slide}>
        <Image src={SEISME1} alt="Slide 1" layout="fill" objectFit="cover" priority />
      </div>
      <div className={styles.slide}>
        <Image src={SEISME2} alt="Slide 2" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.slide}>
        <Image src={SEISME3} alt="Slide 3" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.slide}>
        <Image src={SEISME4} alt="Slide 4" layout="fill" objectFit="cover" />
      </div>
    </div>
    <div className={styles.heroContent}>
      <h1>Séisme au Maroc 2023 : Une Tragédie Qui Marque Notre Histoire</h1>
      <p>
        Explorez des cartes interactives, des graphiques dynamiques et des requêtes spatiales pour visualiser l'impact du séisme sur les bâtiments et les communautés locales.
        Grâce à des outils avancés de visualisation de données et l'intégration de données satellites, 
        cette plateforme vous permet d'analyser et de soutenir la reconstruction des zones sinistrées.
        <br />
        <strong>Ensemble, reconstruisons l'avenir.</strong>
      </p>
      <div className={styles.buttons}>
        <a href="#detail" className={styles.btnDetail}>Plus de détails</a>
        <a href="#contact" className={styles.btnContact}>Contact</a>
      </div>
    </div>
  </section>
);

export default Hero;
