"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";

export default function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12 relative">
        <div className="container mx-auto max-w-4xl z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6">
                <span className="text-white">Page</span>
                <span className="text-[#0099FF]"> Not</span>
                <span className="text-white"> Found</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto md:mx-0">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved to another location.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <Link
                  href="/"
                  className="bg-[#0099FF] text-white px-6 py-3 rounded-full hover:bg-[#0088ee] transition-colors flex items-center justify-center sm:justify-start"
                >
                  <IoHomeOutline className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="bg-[#1E1E1E] text-white px-6 py-3 rounded-full border border-gray-700 hover:bg-[#2A2A2A] transition-colors flex items-center justify-center sm:justify-start"
                >
                  <LuArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-none">
                {/* Background 404 - hidden on very small screens */}
                <div className="hidden sm:block text-[10rem] md:text-[15rem] font-bold text-[#0099FF] opacity-10 absolute -top-10 sm:-top-16 md:-top-20 -left-4 sm:-left-6 md:-left-10 z-0">
                  404
                </div>
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl relative z-10 w-full">
                  <div className="text-7xl sm:text-8xl md:text-9xl font-bold text-center text-[#0099FF]">
                    404
                  </div>
                  <div className="mt-3 sm:mt-4 text-center text-gray-400 text-base sm:text-lg">
                    Page not found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Wave Divider */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-16 sm:h-20 md:h-24 lg:h-32"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-[#1A1A1A]"
          ></path>
        </svg>
      </div>
    </div>
  );
}
