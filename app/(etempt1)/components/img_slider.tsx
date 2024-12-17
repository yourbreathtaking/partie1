'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import image1 from '@/public/images/SEISME1.jpeg';
import image2 from '@/public/images/SEISME2.jpg';
import image3 from '@/public/images/SEISME3.jpg';
import image4 from '@/public/images/SEISME4.jpg';
import image5 from '@/public/images/SEISME5.jpg';
import image6 from '@/public/images/SEISME6.jpg';

const images = [image1, image2, image3,image4, image5, image6]

export default function AutoImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="relative h-[calc(80vh-2rem)]">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-6 text-white">
            <Badge variant="secondary" className="mb-4">
              Actualité
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
              Séisme au Maroc 2023 : Une Tragédie Qui Marque Notre Histoire
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-center max-w-3xl mb-8">
              Explorez des cartes interactives, des graphiques dynamiques et des requêtes spatiales pour visualiser l'impact du séisme sur les bâtiments et les communautés locales. Grâce à des outils avancés de visualisation de données et l'intégration de données satellites, cette plateforme vous permet d'analyser et de soutenir la reconstruction des zones sinistrées.
              Ensemble, reconstruisons l'avenir.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact
              </Button>
              <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground">
                More Details
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 rounded-full p-0 ${
                index === currentIndex ? 'bg-primary' : 'bg-primary/20'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

