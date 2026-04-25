import React, { useState } from "react";
import { X, Lock, User, Mail, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { authApi } from "../../api/authApi";
import { Button } from "../ui/button";

const UpdateModal = ({ isOpen, onClose, mode, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    forgotEmail: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "profile") {
        await authApi.updateProfile({ name: formData.name, email: formData.email });
        setSuccess("Profile updated successfully!");
        if (onSuccess) onSuccess();
        setTimeout(onClose, 2000);
      } else if (mode === "password") {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords do not match");
        }
        await authApi.updatePassword({ 
          oldPassword: formData.oldPassword, 
          newPassword: formData.newPassword 
        });
        setSuccess("Password updated successfully!");
        setTimeout(onClose, 2000);
      } else if (mode === "forgot") {
        await authApi.forgotPassword(formData.forgotEmail);
        setSuccess("Password reset link sent to your email!");
        setTimeout(onClose, 3000);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case "profile":
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>
          </>
        );
      case "password":
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Current Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="oldPassword"
                  type="password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </>
        );
      case "forgot":
        return (
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-500 mb-6 font-medium">Enter your email address and we'll send you a link to reset your password.</p>
            <div className="relative text-left">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="forgotEmail"
                type="email"
                value={formData.forgotEmail}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const titles = {
    profile: "Edit Profile",
    password: "Change Password",
    forgot: "Forgot Password"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{titles[mode]}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderForm()}

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 animate-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <p className="text-xs font-bold">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-50 text-green-600 rounded-2xl border border-green-100 animate-in slide-in-from-top-2">
                <ShieldCheck size={18} />
                <p className="text-xs font-bold">{success}</p>
              </div>
            )}

            <div className="pt-2">
              <Button
                disabled={loading}
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:scale-100"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing...</span>
                  </div>
                ) : (
                  mode === "forgot" ? "Send Reset Link" : "Update Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;