import React, { useEffect } from "react";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout, user, getUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !user) {
      getUser();
    }
  }, [isAuthenticated, user, getUser]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
            <img className="w-8 h-8 md:w-10 md:h-10 object-contain" src="/assets/link.png" alt="Trimmy Logo" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Trimmy</h1>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1 md:p-1.5 border border-gray-200 hover:border-blue-200 transition-colors rounded-full md:rounded-xl outline-none bg-white cursor-pointer shadow-sm group">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {user?.name?.[0]?.toUpperCase() || <img className="w-5 h-5 opacity-70" src="/assets/user.png" alt="" />}
                  </div>
                  <span className="hidden md:block text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1 rounded-2xl shadow-xl border-gray-100">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-3 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                        <p className="text-xs font-medium text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-blue-50 focus:text-blue-600 transition-colors">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-blue-50 focus:text-blue-600 transition-colors">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer rounded-xl py-2.5 px-3 transition-colors"
                    onClick={logout}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    <span className="font-bold">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/login">
                <Button variant="ghost" className="font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl px-4 transition-all">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl px-6 transition-all active:scale-95">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
