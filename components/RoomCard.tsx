"use client";

import { ExternalLink, Layers } from "lucide-react"; // Switched back to Layers icon for floor
import { Room } from "@/app/data/rooms";

export default function RoomCard({ room }: { room: Room }) {
    const floorLabel = room.floor === "0" ? "Basement" : `Floor ${room.floor}`;

    return (
        <a
            href={room.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
        group relative flex flex-col justify-between p-6 rounded-2xl bg-white 
        border border-slate-200 
        transition-all duration-150 ease-out
        
        /* DESKTOP HOVER STATES */
        hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 hover:ring-1 hover:ring-emerald-300
        
        /* MOBILE TOUCH STATES (The Fix) */
        active:scale-[0.98] active:bg-emerald-50 active:border-emerald-500
      "
        >
            <div className="flex justify-between items-start mb-2">
                {/* Floor Label */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wide group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    <Layers size={12} />
                    <span>{floorLabel}</span>
                </div>

                {/* Arrow Icon */}
                <ExternalLink size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>

            <div className="mt-2">
                <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight group-hover:text-emerald-900 transition-colors">
                    {room.name.replace("Room ", "")} <span className="text-lg text-slate-400 font-normal">Room</span>
                </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-sm text-slate-400 font-medium group-hover:text-emerald-600 transition-colors">
                    View Schedule
                </span>
                <span className="text-lg text-emerald-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    →
                </span>
            </div>
        </a>
    );
}