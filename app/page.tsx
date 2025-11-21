"use client";

import { useState } from "react";
import { Search, MapPin, BookOpen } from "lucide-react";
import { ROOMS } from "@/app/data/rooms";
import RoomCard from "@/components/RoomCard";
import AddToHome from "@/components/AddToHome";
import { LinkedinIcon } from "@/components/Icons";

export default function Home() {
  const [selectedFloor, setSelectedFloor] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const displayedRooms = ROOMS.filter((room) => {
    const matchesFloor = selectedFloor === "All" || room.floor === selectedFloor;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id.includes(searchQuery);
    return matchesFloor && matchesSearch;
  });

  const filters = [
    { id: "All", label: "All Floors" },
    { id: "0", label: "Basement" },
    { id: "1", label: "Floor 1" },
    { id: "2", label: "Floor 2" },
    { id: "3", label: "Floor 3" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">

      {/* HEADER SECTION */}
      <header className="bg-gradient-to-br from-emerald-600 to-emerald-600 text-white pt-12 pb-24 px-6 relative shadow-xl">

        <div className="max-w-5xl mx-auto relative z-10 text-center">

          {/* LOGO AREA */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            {/* Icon Container: w-16 h-16 (Mobile) -> w-20 h-20 (Desktop) */}
            <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-xl transform -rotate-6 border-2 border-emerald-50">
              <BookOpen className="text-emerald-600 relative z-10 w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
            </div>

            {/* Title: text-4xl (Mobile) -> text-6xl (Desktop) */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
              BreakoutBuddy
            </h1>
          </div>

          <p className="text-emerald-100 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Instant access to all Ivey breakout and classroom schedules. <br className="hidden md:block" /> Don't waste precious study time moving around.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 md:mt-10 max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-emerald-600 transition-colors h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search for a Room (e.g. 1230)..."
              /* Added 'text-base' to prevent iPhone from zooming in when you tap the input */
              className="w-full pl-12 pr-6 py-3 md:py-4 rounded-2xl bg-white text-gray-900 placeholder:text-gray-400 shadow-2xl outline-none border-2 border-transparent focus:border-emerald-400 transition-all text-base md:text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 relative z-20">

        {/* FILTER BAR - RESPONSIVE DESIGN */}
        {/* Mobile: Full-width strip. Desktop: Centered floating pill. */}
        <div className="sticky top-0 z-30 -mx-4 md:mx-0 mb-8 md:mb-12">
          <div className="
            flex gap-2 overflow-x-auto no-scrollbar 
            bg-white border-y border-slate-100 shadow-sm py-3 px-4 /* Mobile Styles: Full width strip */
            md:bg-white md:border md:border-slate-100 md:shadow-lg md:rounded-full md:p-2 md:w-max md:mx-auto /* Desktop Styles: Floating Pill */
          ">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFloor(filter.id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-transform duration-100
                  active:scale-95
                  ${selectedFloor === filter.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-50 md:bg-white text-slate-500 border border-slate-200 md:border-transparent active:bg-emerald-100 active:text-emerald-700 active:border-emerald-200"}
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* ROOM GRID */}
        {displayedRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No rooms found</h3>
            <p className="text-slate-500">Try searching for a different room number.</p>
          </div>
        )}
      </div>
      <AddToHome />
      {/* Footer - Optimized for Mobile */}
      <footer className="mt-20 text-center text-slate-400 pb-10 px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 text-sm font-medium">
          <span>Not affiliated with the Ivey Business School. Created by Pablo Gonzalez</span>

          {/* The dot separator: Hidden on mobile (hidden), visible on desktop (md:block) */}
          <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

          <a
            href="https://www.linkedin.com/in/pablogonzalez-/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 bg-white md:bg-transparent px-4 py-2 md:p-0 rounded-full md:rounded-none shadow-sm md:shadow-none text-slate-600 md:text-slate-400"
          >
            {/* Note: Make sure Linkedin is imported from lucide-react at the top! */}
            <LinkedinIcon size={14} />
            Connect on LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}