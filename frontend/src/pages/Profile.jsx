import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUrls } from "../hooks/useUrls";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Link as LinkIcon,
  MousePointerClick,
  Settings,
  Bell,
  Lock,
  LogOut,
  Award,
  Star,
  Zap,
  Edit2,
} from "lucide-react";
import { format } from "date-fns";
import UpdateModal from "../components/components/UpdateModal";

const Profile = () => {
  const { user, getUser, logout } = useAuth();
  const { urls, fetchUrls } = useUrls();
  const [modalOptions, setModalOptions] = useState({ isOpen: false, mode: "" });

  useEffect(() => {
    if (!user) {
      getUser();
    }
    fetchUrls();
  }, [user]);

  const joinedDate = user?.created_at ? new Date(user.created_at) : new Date();
  const formattedJoinedDate = format(joinedDate, "MMMM dd, yyyy");

  // Logic for Link Level Badge
  const getLevel = (count) => {
    if (count >= 21)
      return {
        name: "Link Master",
        color: "bg-amber-50 text-amber-600 border-amber-200",
        icon: Zap,
      };
    if (count >= 6)
      return {
        name: "Power User",
        color: "bg-purple-50 text-purple-600 border-purple-200",
        icon: Award,
      };
    return {
      name: "Starter",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      icon: Star,
    };
  };

  const level = getLevel(urls?.length || 0);
  const LevelIcon = level.icon;

  const openModal = (mode) => setModalOptions({ isOpen: true, mode });
  const closeModal = () => setModalOptions({ ...modalOptions, isOpen: false });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <UpdateModal
        isOpen={modalOptions.isOpen}
        onClose={closeModal}
        mode={modalOptions.mode}
        initialData={user}
        onSuccess={getUser}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="p-1 bg-white rounded-3xl">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-4xl border-4 border-white shadow-sm">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              </div>
              <button
                onClick={() => openModal("profile")}
                className="mb-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm flex items-center gap-2 text-xs"
              >
                <Settings size={18} />
                Edit Profile
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {user?.name}
              </h1>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Stats & Info */}
          <div className="md:col-span-1 space-y-8">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Your Activity
              </h3>

              {/* New Feature: Link Level Badge */}
              <div
                className={`flex flex-col gap-2 p-3 rounded-2xl border ${level.color} transition-all duration-500`}
              >
                <div className="flex items-center gap-3">
                  <LevelIcon size={20} />
                  <span className="font-bold text-sm uppercase tracking-tight">
                    Current Status
                  </span>
                </div>
                <p className="text-lg font-black">{level.name}</p>
              </div>

              {/* Right Column: Total Links */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <LinkIcon size={20} className="text-blue-600" />
                    <span className="font-bold text-blue-900">Total Links</span>
                  </div>
                  <span className="text-xl font-black text-blue-600">
                    {urls?.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} className="text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400">
                      Joined
                    </span>
                    <span className="text-sm font-bold">
                      {formattedJoinedDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <ShieldCheck size={18} className="text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400">
                      Status
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      Verified Account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Account Settings
                </h2>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openModal("password")}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <Lock size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">
                        Privacy & Security
                      </p>
                      <p className="text-xs text-gray-500">
                        Change password and security settings
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <div className="pt-4 mt-4 border-t border-gray-50">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-50 text-red-600 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
                      <LogOut size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-extrabold">Sign Out</p>
                      <p className="text-xs opacity-70 font-medium">
                        Log out of your account securely
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
