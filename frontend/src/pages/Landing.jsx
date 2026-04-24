import React from "react";
import UrlShorten from "@/components/components/UrlShorten.jsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 shadow-inner">
                <img className="w-16 h-16 animate-pulse" src="/assets/link.png" alt="Trimmy" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Shorten links. <span className="text-blue-600">Measure results.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium">
              Trimmy is the complete link management platform for sharing, tracking, and optimizing your URLs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <Link to="/signup">
                <Button className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="h-14 px-8 text-lg font-bold rounded-xl border-2 transition-all active:scale-95">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Shorten Component in Hero */}
        {/* <div className="mt-16">
          <UrlShorten />
        </div> */}
      </div>

      {/* Feature Section Preview */}
      <div className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900">Shorten</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Turn any long URL into a short, manageable link in just one click.</p>
            </div>
            <div className="space-y-4">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900">Share</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Share your links across social media, email, or any digital platform.</p>
            </div>
            <div className="space-y-4">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900">Analyze</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Track every click with detailed analytics on devices, locations, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
