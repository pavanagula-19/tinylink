"use client";

import { LogOut, CreditCard, User, Settings, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PATH from "@/routes/path";
import { logout } from "@/redux/slices/auth-slice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth_token");
    navigate(PATH.LOGIN);
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800">
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-lg sm:text-xl text-neutral-800 dark:text-neutral-100">
          TinyLink
        </h1>

        <div className="flex items-center gap-3">
          <Separator
            orientation="vertical"
            className="h-6 hidden sm:flex bg-gray-300 dark:bg-neutral-700"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="ring-2 ring-primary/70 cursor-pointer hover:ring-primary transition h-9 w-9">
                <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-white font-bold">
                  U
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl border border-gray-200 dark:border-neutral-800 dark:bg-neutral-900 p-2"
            >
              <DropdownMenuLabel className="font-semibold text-sm px-2">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="rounded-md">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="rounded-md">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="rounded-md">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
