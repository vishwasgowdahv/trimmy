import React from "react";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex justify-between items-center px-10 py-5">
      <Link to="/" className="flex justify-left items-center lg:mx-10 mx-1">
        <img className="w-10 h-10" src="/assets/link.png" alt="" />
        <h1 className="text-3xl font-bold mx-2">Trimmy</h1>
      </Link>

      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-10 my-auto border border-black font-semibold rounded-full p-2 outline-none">
            <img className="w-5 h-5" src="/assets/user.png" alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <UserIcon className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 cursor-pointer"
              onClick={logout}
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="font-semibold">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="font-semibold bg-black text-white hover:bg-gray-800">Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
