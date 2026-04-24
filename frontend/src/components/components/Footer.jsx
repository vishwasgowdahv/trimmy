import React from "react";
// import { Link2Icon, Github, Twitter, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 items-center md:items-start text-center md:text-left">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img
                className="w-8 h-8"
                src="/assets/link.png"
                alt="Trimmy Logo"
              />
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Trimmy
              </span>
            </div>
            <p className="text-gray-500 max-w-sm font-medium leading-relaxed mx-auto md:mx-0">
              Making the web shorter, one link at a time. Empowering creators
              and businesses with powerful link management and analytics.
            </p>
          </div>

          {/* Links container for mobile side-by-side */}
          <div className="grid grid-cols-2 md:contents gap-8 w-full">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-400 font-medium text-center">
            © {year} Trimmy. All rights reserved. Built with ❤️ for the web.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
