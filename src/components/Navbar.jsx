"use client";
import logo from "../../public/knowledgehub_icon_only.png";
import { useState } from "react";
import { Button, Separator, Spinner } from "@heroui/react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import { ThemeSwitch } from "./ThemeSwitch";
import { authClient } from "@/lib/auth-client";
import { FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const baseNavItems = [
    { label: "Home", href: "/", isActive: true },
    { label: "Browse", href: "/browse?page=1", isActive: false },
  ];

  const dashboardLinks = {
    user: "/dashboard/user",
    librarian: "/dashboard/librarian",
    admin: "/dashboard/admin",
  };

  const navItems = user?.email
    ? [
        ...baseNavItems,
        {
          label: "Dashboard",
          href: dashboardLinks[user.role] ,
        },
      ]
    : baseNavItems;

  const [activeItem, setActiveItem] = useState(
    navItems.find((item) => item.isActive)?.label || navItems[0].label,
  );

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 items-center justify-between px-6">
        <Link className="flex items-center justify-center" href={"/"}>
          <Image src={logo} height={50} width={50} alt="logo" />
          <p className="font-bold text-xl md:text-2xl">
            Knowledge<span className="text-orange-500">Hub</span>
          </p>
        </Link>

        <div className="flex items-center md:flex-1 md:justify-end md:gap-6">
          <ThemeSwitch />

          <ul className="hidden items-center gap-6 md:flex bg-gray-300 p-2 px-4 rounded-full">
            {navItems.map((item, index) => {
              const isCurrentActive = activeItem === item.label;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className={
                      isCurrentActive
                        ? "font-bold text-orange-600"
                        : "text-gray-700"
                    }
                    aria-current={isCurrentActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Separator orientation="vertical" className="hidden md:block" />

          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <>
                <div className="w-9 h-9 rounded-full  flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                  {isPending ? (
                    <Spinner color="warning" />
                  ) : user?.image ? (
                    <Image
                      src={user.image}
                      width={36}
                      height={36}
                      alt="avatar"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {user?.name?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 rounded-full p-2 text-white px-4 text-sm flex justify-center items-center gap-2"
                >
                  Logout <FaArrowRight></FaArrowRight>
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link
                  href="/signup"
                  className="bg-orange-500 rounded-full p-2 text-white px-4 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
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

      {/* Mobile Menu */}
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

            <li className="mt-4 flex flex-col items-center gap-3 border-t border-separator pt-4 w-full">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full max-w-xs bg-orange-500 rounded-full p-2 text-white text-sm"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 w-full justify-center"
                  >
                    Login
                  </Link>
                <Link
                  href="/signup"
                  className="bg-orange-500 rounded-full p-2 text-white px-4 text-sm"
                >
                  Sign Up
                </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
