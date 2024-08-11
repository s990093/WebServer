"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaHeart,
  FaTshirt,
  FaUpload,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaServer,
} from "react-icons/fa";

const Navbar = () => {
  // useEffect(() => {
  //   console.log("isLoggedIn:", isLoggedIn);
  //   console.log("username:", username);
  // }, [isLoggedIn, username]);
  const navLinks = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/swagger/", label: "API Documentation", icon: <FaBook /> }, // Updated link and label
    { href: "/admin", label: "Admin", icon: <FaCog /> }, // 指向新的 Admin 页面
    { href: "/ws", label: "WS", icon: <FaServer /> }, // 指向新的 Admin 页面
    { href: "/perf", label: "Pr", icon: <FaServer /> }, // 指向新的 Admin 页面
  ];

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href}>
              <div className="text-white flex items-center space-x-2">
                {icon}
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
