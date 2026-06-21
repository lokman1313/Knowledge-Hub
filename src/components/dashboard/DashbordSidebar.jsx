"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {
  FiMenu,
  FiHome,
  FiBook,
  FiUsers,
  FiRepeat,
  FiUser,
} from "react-icons/fi";
import {Button, Drawer} from "@heroui/react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      icon: FiHome,
      href: "/dashboard/librarian",
      label: "Dashboard",
    },
    {
      icon: FiBook,
      href: "/dashboard/librarian/books",
      label: "Books",
    },
    {
      icon: FiUsers,
      href: "/dashboard/librarian/members",
      label: "Members",
    },
    {
      icon: FiRepeat,
      href: "/dashboard/librarian/borrowings",
      label: "Borrowings",
    },
    {
      icon: FiUser,
      href: "/dashboard/librarian/profile",
      label: "Profile",
    },
  ];

  const navLinks = (
    <ul className="flex flex-col gap-2">
      {navItems.map((item) => {
       const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-orange-500/10 text-orange-600 font-semibold border-l-4 border-orange-500"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon
                size={18}
                className={
                  isActive ? "text-orange-500" : "text-gray-500"
                }
              />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200  p-4 min-h-[calc(100vh-64px)] sticky top-16">
        <div className="mb-6 px-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider ">
            Librarian Menu
          </h2>
        </div>

        {navLinks}
      </aside>

      {/* Mobile Floating Menu Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          isIconOnly
          radius="full"
          className="bg-orange-500 text-white shadow-lg"
          onPress={() => setOpen(true)}
        >
          <FiMenu size={22} />
        </Button>
      </div>

      {/* Mobile Drawer */}
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-xl font-bold">
                  Knowledge
                  <span className="text-orange-500">Hub</span>
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navLinks}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}