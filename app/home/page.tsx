"use client";
import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  ExternalLink,
  BarChart,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";








import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  






const LandingPages = [
  {
    id: 1,
    title: "Summer Collection 2024",
    status: "active",
    views: 1234,
    trend: "up",
    trendPercentage: "+12%",
    conversions: 56,
    conversionRate: "4.5%",
    lastModified: "2024-03-10",
    theme: "from-indigo-500/5 to-purple-500/5 border-l-indigo-500",
    accentColor: "text-indigo-600",
  },
  {
    id: 2,
    title: "New Fitness Program",
    status: "draft",
    views: 892,
    trend: "down",
    trendPercentage: "-3%",
    conversions: 43,
    conversionRate: "4.8%",
    lastModified: "2024-03-09",
    theme: "from-emerald-500/5 to-teal-500/5 border-l-emerald-500",
    accentColor: "text-emerald-600",
  },
];

export default function Page() {
  const [landingPages, setLandingPages] = useState(LandingPages);

  return (
    <div className="pt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Your Landing Pages
        </h1>



        <Dialog>
  <DialogTrigger>   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-md hover:bg-blue-700 transition">
          Create New Page
        </button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new page</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
      <div className="text-lg font-medium">Title</div>
      <input className="border-black border p-2 rounded-xl"></input>
      <div className="text-lg font-medium">Description</div>
      <textarea className="border-black border p-2 rounded-xl"></textarea>
    </DialogHeader>
    <div>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-md hover:bg-blue-700 transition">
          Create 
        </button>
    </div>
  </DialogContent>
</Dialog>

     
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {landingPages.map((page) => (
          <div
            key={page.id}
            className={`group rounded-2xl bg-gradient-to-br ${page.theme} border-l-4 hover:border-l-6 transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                    {page.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span
                      className={`inline-flex items-center cursor-pointer px-3 py-1 rounded-full text-xs font-medium ${
                        page.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {page.lastModified}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    page.trend === "up"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {page.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{page.trendPercentage}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 ">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Views</p>
                  <p className={`text-lg sm:text-xl font-semibold ${page.accentColor}`}>
                    {page.views.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Conversions</p>
                  <p className={`text-lg sm:text-xl font-semibold ${page.accentColor}`}>
                    {page.conversions}
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Rate</p>
                  <p className={`text-lg sm:text-xl font-semibold ${page.accentColor}`}>
                    {page.conversionRate}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 bg-white rounded-xl hover:bg-gray-50 shadow-sm hover:shadow transition-all duration-200">
                  <Edit2 className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Edit</span>
                </button>
               
                <a
                  href="#"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 bg-white rounded-xl hover:bg-gray-50 shadow-sm hover:shadow transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Visit</span>
                </a>
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 text-red-600 bg-white rounded-xl hover:bg-red-50 shadow-sm hover:shadow transition-all duration-200 ml-auto">
                  <Trash2 className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
