
//@ts-nocheck
"use client";
import React, { use, useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  ExternalLink,
  BarChart,
  ArrowUp,
  ArrowDown,
  Clock,
  User,
  Search,
  Bell,
  Settings,
} from "lucide-react";

import { useRouter } from "next/navigation";

import axios from "axios";

import { useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
  


function formatDate(dateInput:Date) {
    const date = new Date(dateInput);
  
    // Format to "MM-DD-YY"
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear().toString().slice(2)}`;
  
    return formattedDate;
  }
  



const LandingPages = [
    {
      id: 1,
      title: "Summer Collection 2024",
      description: "Showcase of our latest summer fashion trends featuring sustainable materials and modern designs.",
      status: "active",
      lastModified: "2024-03-10",
      theme: "from-violet-500/5 to-fuchsia-500/5 border-l-violet-500",
      accentColor: "text-violet-600",
      bgGradient: "from-violet-50 to-fuchsia-50",
      hoverGradient: "hover:from-violet-100 hover:to-fuchsia-100",
      buttonsBg: "bg-violet-50",
      buttonHoverBg: "hover:bg-violet-100",
    },
    {
      id: 2,
      title: "New Fitness Program",
      description: "Complete workout routines and nutrition guides for achieving your fitness goals in 2024.",
      status: "draft",
      lastModified: "2024-03-09",
      theme: "from-teal-500/5 to-emerald-500/5 border-l-teal-500",
      accentColor: "text-teal-600",
      bgGradient: "from-teal-50 to-emerald-50",
      hoverGradient: "hover:from-teal-100 hover:to-emerald-100",
      buttonsBg: "bg-teal-50",
      buttonHoverBg: "hover:bg-teal-100",
    },
    {
      id: 3,
      title: "Tech Conference 2024",
      description: "Annual technology conference featuring industry leaders and innovative workshops.",
      status: "active",
      lastModified: "2024-03-08",
      theme: "from-blue-500/5 to-indigo-500/5 border-l-blue-500",
      accentColor: "text-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      hoverGradient: "hover:from-blue-100 hover:to-indigo-100",
      buttonsBg: "bg-blue-50",
      buttonHoverBg: "hover:bg-blue-100",
    },
    {
      id: 4,
      title: "Autumn Art Exhibition",
      description: "Curated collection of contemporary artworks from emerging artists worldwide.",
      status: "draft",
      lastModified: "2024-03-07",
      theme: "from-amber-500/5 to-orange-500/5 border-l-amber-500",
      accentColor: "text-amber-600",
      bgGradient: "from-amber-50 to-orange-50",
      hoverGradient: "hover:from-amber-100 hover:to-orange-100",
      buttonsBg: "bg-amber-50",
      buttonHoverBg: "hover:bg-amber-100",
    },
    {
      id: 5,
      title: "Wellness Retreat",
      description: "Immersive wellness experience combining meditation, yoga, and mindfulness practices.",
      status: "active",
      lastModified: "2024-03-06",
      theme: "from-rose-500/5 to-pink-500/5 border-l-rose-500",
      accentColor: "text-rose-600",
      bgGradient: "from-rose-50 to-pink-50",
      hoverGradient: "hover:from-rose-100 hover:to-pink-100",
      buttonsBg: "bg-rose-50",
      buttonHoverBg: "hover:bg-rose-100",
    },
    {
      id: 6,
      title: "Green Living Workshop",
      description: "Learn sustainable living practices and eco-friendly lifestyle tips from experts.",
      status: "draft",
      lastModified: "2024-03-05",
      theme: "from-lime-500/5 to-green-500/5 border-l-lime-500",
      accentColor: "text-lime-600",
      bgGradient: "from-lime-50 to-green-50",
      hoverGradient: "hover:from-lime-100 hover:to-green-100",
      buttonsBg: "bg-lime-50",
      buttonHoverBg: "hover:bg-lime-100",
    }
  ];
  

export default function Page() {
  const [landingPages, setLandingPages] = useState(LandingPages);
const {data:session} = useSession()
  const [title, settitle] = useState('')
  interface Page {
    id: number;
    title: string;
    discription: string;
    createdAt: Date;
  }
  
  const [pages, setpages] = useState<Page[]>([])
const [description, setdescription] = useState('')
const [open, setopen] = useState(false)
const [loader, setloader] = useState(false)
const router = useRouter()
const [render, setRender] = useState(0);
useEffect(() => {
axios.get('api/page').then((res)=>{setpages(res.data)})
}, [render])



  const forceRerender = () => {
    setRender(prev => prev + 1);
  };
  return (



    <div className="min-h-screen bg-gray-50">
      {/* User Info Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <User  className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{session?.user.name}</h2>
                <p className="text-sm text-gray-500">{session?.user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative group">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                <span className="absolute inset-0 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
                <Settings className="h-5 w-5 text-gray-600 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Create New */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <div className="relative flex-grow max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow duration-200"
              placeholder="Search landing pages..."
            
             
            />
          </div>

          <Dialog open={open} onOpenChange={setopen}>
  <DialogTrigger>    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 transform hover:-translate-y-0.5">
            Create New Page
          </div></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new page</DialogTitle>
      <DialogDescription>
     Add title and description for your new landing page so it is easy to manage.
      </DialogDescription>
      <div className="text-lg font-medium flex justify-start">Title</div>
      <input value={title} onChange={(e)=>{settitle(e.target.value)}} className="border-black  border p-2 rounded-xl"></input>
      <div className="text-lg font-medium  flex justify-start">Description<div className="text-sm px-1 text-gray-600 font-light">(optional)</div></div>
      <textarea value={description} onChange={(e)=>{setdescription(e.target.value)}} className="border-black border p-2 rounded-xl"></textarea>
    </DialogHeader>
    <div>
        <Button  onClick={()=>{ setloader(true); axios.post('api/page',{title,description}).then(()=>{setloader(false); forceRerender(); setopen(false)}) }} disabled={title.length===0} variant={"default"} color="blue"> {loader?<ClipLoader color="#FFFFFF"></ClipLoader>:'Create'}</Button>

    </div>
  </DialogContent>
</Dialog>

        
        </div>

        {/* Landing Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`group rounded-xl bg-gradient-to-br from-teal-100 hover:to-emerald-100" border-l-4 hover:border-l-6 transition-all duration-300 shadow-md `}
            >
              <div className="p-6">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                        {page.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          true
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                       
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {page.discription}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      { formatDate(page.createdAt)}
                      {page.hashedId}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <button 
                      className={`flex items-center gap-1 px-2 py-1.5 text-gray-700 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-200 group/btn`}
                    >
                      <Edit2 className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-xs font-medium">Edit</span>
                    </button>
                    <a
                      href="#"
                      className={`flex items-center gap-1 px-2 py-1.5 text-gray-700 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-200 group/btn`}
                    >
                      <ExternalLink className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-xs font-medium" onClick={()=>{router.push(`http://localhost:3000/${page.hashedId}`)}}>Visit</span>
                    </a>
                    <a
                      href={`/analytics/${page.id}`}
                      className={`flex items-center gap-1 px-2 py-1.5 text-gray-700 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-200 group/btn`}
                    >
                   <BarChart className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-xs font-medium">Stats</span>
                    </a>
                  </div>
                  <button 
                    className="flex items-center gap-1 px-2 py-1.5 text-red-600 bg-red-100 rounded-lg shadow-sm hover:shadow transition-all duration-200 group/btn"
                  >
                    <Trash2 className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}





