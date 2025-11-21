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
            {/* Icon: Smaller on mobile (w-12), bigger on desktop (md:w-16) */}
            <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl transform -rotate-6 border-2 border-emerald-50">
              <BookOpen className="text-emerald-600 relative z-10 w-6 h-6 md:w-9 md:h-9" strokeWidth={2} />
            </div>

            {/* Title: Smaller on mobile (text-3xl), bigger on desktop (md:text-5xl) */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
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

        {/* FILTER BAR (RESPONSIVE) */}
        {/* Mobile: Horizontal Scroll. Desktop: Centered Pill. */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 mb-8 md:mb-12 no-scrollbar">
          <div className="flex gap-2 md:bg-white md:p-2 md:rounded-full md:shadow-lg md:border md:border-slate-100 flex-nowrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFloor(filter.id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap
                  active:scale-95 /* Adds a "press" effect on touch */
                  ${selectedFloor === filter.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white md:bg-transparent text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-100 md:border-none shadow-sm md:shadow-none"}
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
      {/* Footer */}
      <footer className="mt-20 text-center text-slate-400 pb-8">
        <p className="flex items-center justify-center gap-2 text-sm font-medium">
          Not affiliated with the Ivey Business School. Created by Pablo Gonzalez
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <a
            href="https://www.linkedin.com/in/pablogonzalez-/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
          >
            <LinkedinIcon size={14} />
            Connect on LinkedIn
          </a>
        </p>
      </footer>
    </main>
  );
}