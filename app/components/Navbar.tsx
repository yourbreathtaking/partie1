import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import ModeToggle from "./ModeToggle";

const Navbar: React.FC = () => {
  return (
    <div className=" border-b shadow-sm ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <div className="text-xl font-bold px-5">MyApp</div>
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard">
              <div className="text-gray-700 hover:text-black px-4 ">Dashboard</div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about">
                <div className="text-gray-700 hover:text-black px-4">About</div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">
              <div className="text-gray-700 hover:text-black px-4">nooo</div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/* Call-to-Action Button */}
            <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button asChild>
            <Link href="/login">
                Login
            </Link>
            </Button>
            </div>
            <nav className="flex items-center space-x-1">
            <ModeToggle />
            </nav>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
