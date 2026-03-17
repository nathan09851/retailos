"use client";

import { Bell, Search, Bot } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-card text-card-foreground">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-muted-foreground left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-secondary">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-electric-blue rounded-full animate-pulse"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-secondary">
          <Bot className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 bg-secondary rounded-full">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
