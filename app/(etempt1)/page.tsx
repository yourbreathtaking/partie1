"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import AutoImageSlider from "./components/img_slider";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation, Variants } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image"; // Import the Image component
import logo from "@/public/images/favicon.ico"; // Import the logo image
import ModeToggle from "./components/ModeToggle";
const Map = dynamic(() => import("./components/Map"), { ssr: false });

const contacts = [
  { name: "Mohamed Salem Bouhia", email: "mohamed.salim.bo@gmail.com" },
  { name: "Ech-chetyouy Houssaine", email: "eechchetyouy@gmail.com" },
  { name: "Maroua Chettat", email: "chattatmaroua@gmail.com" },
  { name: "Slimani Mohamed Amine", email: "slimamine09@gmail.com" },
  { name: "Zouhir Taamart", email: "zouhayrtaamart2002@gmail.com" },
];

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

export default function Page() {
  const contactsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const scrollToContacts = () => {
    contactsRef.current?.scrollIntoView({ behavior: 'smooth' });
    controls.start("offscreen").then(() => controls.start("onscreen"));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("onscreen");
        }
      },
      { threshold: 0.1 }
    );

    if (contactsRef.current) {
      observer.observe(contactsRef.current);
    }

    return () => {
      if (contactsRef.current) {
        observer.unobserve(contactsRef.current);
      }
    };
  }, [controls]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-gray-900 text-white p-4 shadow-md ">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full mr-2 relative">
    <Image 
      src={logo} 
      alt="Logo" 
      className="object-contain absolute left-[7px]" 
      width={32} 
      height={32} 
    />
              
            </div>
              <h1 className="text-2xl font-bold tracking-tight font-[\'Sofia\',sans-serif]">Seismaroc</h1>
            </div>
            <div className="flex space-x-5">
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Home</a>
              
              <button onClick={scrollToContacts} className="text-sm font-medium text-gray-300 hover:text-white">Contacts</button>
              
            </div>
            <div className="flex items-center">
            <nav className="flex items-center space-x-1">
            <ModeToggle />
            </nav>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-background text-foreground">
          <AutoImageSlider />
        </main>
        <main className="flex-grow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Map (spans 2 columns) */}
            <div className="md:col-span-2 rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col" style={{ height: '500px' }}>
              <h2 className="text-lg font-semibold mb-2">Map</h2>
              <div className="flex-grow relative">
                <Map />
              </div>
            </div>

            {/* Buttons */}
            <div className="rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-center items-center space-y-4">
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" id="avant"> Avant </Button>
              <Button className="w-full bg-green-500 text-white hover:bg-green-600" id="apres">Apres</Button>
            </div>

            {/* Pie Chart 1 */}
            <div className="rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-2">Répartition des Batiments</h2>
              <div id="piechart1" className="aspect-video rounded-lg bg-gray-100 h-full w-full overflow-hidden"></div>
            </div>

            {/* Pie Chart 2 */}
            <div className="rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-2">Répartition de Remboursements</h2>
              <div id="piechart2" className="aspect-video rounded-lg bg-gray-100 h-full w-full overflow-hidden"></div>
            </div>

            {/* Line Graph */}
            <div className="rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-2">Population</h2>
              <div className="aspect-video rounded-lg bg-gray-100 overflow-hidden" id="graph"></div>
            </div>
            {/* Contacts */}
            <div ref={contactsRef} className="md:col-span-3 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Contacts</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial="offscreen"
                animate={controls}
                variants={{
                  onscreen: {
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {contacts.map((contact, index) => (
                  <motion.div key={index} variants={cardVariants}>
                    <Card>
                      <CardContent className="flex items-center space-x-4 p-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${contact.name.charAt(0)}`} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-gray-500">{contact.email}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
