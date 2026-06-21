"use client"
import logo from "../../public/knowledgehub_icon_only.png"
import { useState } from "react";
import { Button, Separator } from "@heroui/react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import { ThemeSwitch } from "./ThemeSwitch";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", isActive: true },
    { label: "Browse", href: "/browse", isActive: false },
    { label: "Dashboard", href: "/dashboard/librarian", isActive: false }, 
  ];
  const dashboardLinks = {
    seeker: "/dashboard/reader",
    recruiter: "/dashboard/librarian",
    admin: "/dashboard/admin",
  };
  // const navItems = user?.email
  //   ? [
  //       ...baseNavItems,
  //       {
  //         label: "Dashboard",
  //         href: dashboardLinks[user.role] || dashboardLinks.reader,
  //       },
  //     ]
  //   : baseNavItems;

  const [activeItem, setActiveItem] = useState(
    navItems.find(item => item.isActive)?.label || navItems[0].label
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16  items-center justify-between px-6">
        
        <div className="flex items-center justify-center">
          <Image src={logo} height={50} width={50} alt="logo"></Image>
          <p className="font-bold text-xl">Knowledge<span className="text-orange-500">Hub</span></p>
        </div>

        <div className="flex items-center md:flex-1 md:justify-end md:gap-6">
          <ThemeSwitch></ThemeSwitch>
          <ul className="hidden items-center gap-6 md:flex bg-gray-300 p-2 px-4 rounded-full">
            {navItems.map((item, index) => {
              const isCurrentActive = activeItem === item.label;
              return (
                <li key={index}>
                  <Link 
                    href={item.href}
                    onClick={() => setActiveItem(item.label)} 
                    className={isCurrentActive ? "font-bold text-orange-600" : "text-gray-700"}
                    aria-current={isCurrentActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Separator orientation="vertical" className="hidden md:block " />
          <div className="hidden items-center gap-4 md:flex">
            <Link href="#">Login</Link>
            <Button>Sign Up</Button>
          </div>

          <button
            className="md:hidden ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <CiMenuBurger />
          </button>
        </div>

      </header>

      {/* Mobile Menu Dropdown - সেন্টারে থাকবে */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            {navItems.map((item, index) => {
              const isCurrentActive = activeItem === item.label;
              return (
                <li key={index} className="w-full">
                  <Link 
                    href={item.href} 
                    onClick={() => {
                      setActiveItem(item.label);
                      setIsMenuOpen(false);
                    }}
                    className={`block py-2 w-full justify-center ${isCurrentActive ? "font-bold text-orange-500" : "text-gray-600"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            
            {/* Login এবং Sign Up সেকশন */}
            <li className="mt-4 flex flex-col items-center gap-3 border-t border-separator pt-4 w-full">
              <Link href="#" className="block py-2 w-full justify-center">
                Login
              </Link>
              <Button className="w-full max-w-xs">Sign Up</Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}