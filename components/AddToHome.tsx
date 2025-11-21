"use client";

import { useState, useEffect } from "react";
import { X, Bookmark, Share, MoreVertical } from "lucide-react";

export default function AddToHome() {
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        // 1. Detect Device
        const userAgent = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(userAgent);
        const android = /android/.test(userAgent);

        setIsIOS(ios);
        setIsAndroid(android);

        // 2. Show after 3 seconds
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto z-50 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div className="bg-white p-4 rounded-xl shadow-2xl border border-emerald-100 max-w-sm mx-auto relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                    <X size={16} />
                </button>

                <div className="flex gap-4 items-start pr-6">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 mt-1 shrink-0">
                        <Bookmark size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Save for later?</h4>
                        <p className="text-sm text-gray-500 leading-relaxed mb-3">
                            Add BreakoutBuddy to your home screen for instant access.
                        </p>

                        {/* Dynamic Instructions */}
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 flex items-center gap-2">
                            <span className="font-semibold text-emerald-700">Tip:</span>

                            {isIOS && (
                                <span>Tap <Share size={12} className="inline mx-1" /> then "Add to Home Screen"</span>
                            )}

                            {isAndroid && (
                                <span>Tap <MoreVertical size={12} className="inline mx-1" /> then "Add to Home Screen"</span>
                            )}

                            {!isIOS && !isAndroid && (
                                <span>Press <span className="inline-block px-1 bg-white border rounded shadow-sm">Ctrl + D</span> or <span className="inline-block px-1 bg-white border rounded shadow-sm">⌘ + D</span></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}