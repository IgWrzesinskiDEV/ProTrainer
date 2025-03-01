"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProTrainerLogo from "@/components/UI/logo/ProTrainerLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <ProTrainerLogo className="w-10 h-10" />
          <span
            className={`text-xl font-bold ${
              isScrolled ? "text-secondary-900" : "text-white"
            }`}
          >
            ProTrainer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium transition-colors hover:text-primary-600 ${
              isScrolled ? "text-secondary-800" : "text-white"
            }`}
          >
            Home
          </Link>
          {/* <Link
            href="/pricing"
            className={`font-medium transition-colors hover:text-primary-600 ${
              isScrolled ? "text-secondary-800" : "text-white"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={`font-medium transition-colors hover:text-primary-600 ${
              isScrolled ? "text-secondary-800" : "text-white"
            }`}
          >
            About us
          </Link> */}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/auth/login"
            className={`font-medium transition-colors hover:text-primary-600 ${
              isScrolled ? "text-secondary-800" : "text-white"
            }`}
          >
            Log In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-5 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={isScrolled ? "currentColor" : "white"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={isScrolled ? "currentColor" : "white"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="font-medium text-secondary-800 hover:text-primary-600"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="font-medium text-secondary-800 hover:text-primary-600"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="font-medium text-secondary-800 hover:text-primary-600"
            >
              About us
            </Link>
            <hr className="border-gray-200" />
            <Link
              href="/login"
              className="font-medium text-secondary-800 hover:text-primary-600"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-full text-center"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
