import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './ImageSlider.module.css';

const images = [
  { src: '/IMGS/SEISME1.jpeg', alt: 'Slide 1' },
  { src: '/IMGS/SEISME2.jpg', alt: 'Slide 2' },
  { src: '/IMGS/SEISME3.jpg', alt: 'Slide 3' },
  { src: '/IMGS/SEISME4.jpg', alt: 'Slide 4' },
];

const ImageSlider = () => (
  <div className={styles.sliderContainer}>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      navigation
      loop
      className={styles.slider}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className={styles.slide}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ImageSlider;
