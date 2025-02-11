"use client"
import React, { useEffect, useState } from 'react';
import { FaCross, FaImage, FaPlus } from "react-icons/fa6";
import { Instagram, ExternalLink, Heart, ShoppingBag, Palette } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { TbEdit } from "react-icons/tb";
import { FaEye, FaFileUpload, FaSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
interface Product {
  id: number|null;
  name: string;
  description: string;
  price: string;
  image: string;
  affiliateLink: string;
}

interface GradientTheme {
  id: string;
  name: string;
  classes: string;
}




















const gradientThemes: GradientTheme[] = [
  {
    id: 'pink-purple',
    name: 'Pink Purple',
    classes: 'from-pink-300 via-purple-300 to-indigo-400'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    classes: 'from-orange-300 via-red-300 to-pink-400'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    classes: 'from-cyan-300 via-blue-300 to-indigo-400'
  },
  {
    id: 'forest',
    name: 'Forest',
    classes: 'from-green-300 via-emerald-300 to-teal-400'
  },
   
  {
    id: 'aurora',
    name: 'Aurora Dreams',
    classes: 'from-pink-300 via-purple-400 to-indigo-500 bg-gradient-to-br'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    classes: 'from-amber-200 via-violet-400 to-pink-500 bg-gradient-to-bl'
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    classes: 'from-cyan-300 via-blue-500 to-indigo-600 bg-gradient-to-tr'
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    classes: 'from-green-300 via-teal-400 to-blue-500 bg-gradient-to-tl'
  }

];

const products: Product[] = [
  {
    id: 1,
    name: "Summer Dress Collection",
    description: "Perfect for beach days and summer parties",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500",
    affiliateLink: "https://example.com/summer-dress"
  },
  {
    id: 2,
    name: "Minimalist Watch",
    description: "Elegant timepiece for everyday wear",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=500",
    affiliateLink: "https://example.com/watch"
  },
  {
    id: 3,
    name: "Skincare Set",
    description: "Complete morning routine essentials",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=500",
    affiliateLink: "https://example.com/skincare"
  }
];

function Home() {
  const [currentTheme, setCurrentTheme] = useState<string>(gradientThemes[0].id);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { data: session } = useSession();
const [isModalOpen, setisModalOpen] = useState(false)
const [Links, setLinks] = useState(products)
const [EditMode, setEditMode] = useState(false)
const [editingLink, setEditingLink] = useState<Product|null>(null)
const [newLink, setNewLink] = useState<Product>({id :null ,  name: '', description: '',   affiliateLink: '', image: '',price:'' })
  useEffect(() => {

  console.log(session?.user?.name);


}, []);











const handleAddLink = () => {
  if (newLink.name && newLink.affiliateLink) {
    setLinks([...Links, { ...newLink, id: Date.now() }]);
    setNewLink({ name: '', description: '', affiliateLink: '', price: '', image: '' ,id:null});
    setisModalOpen(false);
  }
};

// const handleDeleteLink = (id: string) => {
//   setLinks(Links.filter(link => link.id !== id));
// };


const handleEditLink = (link: Product) => {
  setEditingLink(link);
  setNewLink(link);
  setisModalOpen(true);
};

const handleSaveEdit = () => {
  if (editingLink && newLink.name && newLink.affiliateLink) {
    setLinks(Links.map(link => 
      link.id === editingLink.id ? { ...newLink, id: link.id } : link
    ));
    setEditingLink(null);
    setNewLink({ name: '', description: '', affiliateLink: '', image: '',price:'',id:null });
    setisModalOpen(false);
  }
};















  const getCurrentThemeClasses = () => {
    return gradientThemes.find(theme => theme.id === currentTheme)?.classes || gradientThemes[0].classes;
  };

  return (
    <div className={`min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${getCurrentThemeClasses()} py-8 px-4 transition-colors duration-500`}>
      <div className="max-w-lg mx-auto">
        {/* Theme Switcher */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className=" flex item-center gap-3 text-gray-600 md:text-xl bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
            >
              Theme
              <Palette  className="text-gray-600" />
            </button>
            
            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 z-20 bg-white rounded-lg shadow-lg overflow-hidden">
                {gradientThemes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setCurrentTheme(theme.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      currentTheme === theme.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            )}





  {/* Gradient Picker Modal */}





          </div>
        </div>
        <div className="absolute top-4  left-4">
          <div className="relative">
            <button
            onClick={()=>{setEditMode(EditMode=>!EditMode)}}
            
              className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
            >
             {EditMode?<div  className='flex items-center gap-3 md:text-xl text-gray-600'>Edit <TbEdit></TbEdit></div>:<div className='flex items-center gap-3 md:text-xl text-gray-600' >View <FaEye></FaEye></div>}
            </button>
            
            
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
            lifestyle.beauty
            <a 
              href="https://instagram.com/lifestyle.beauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-pink-200 transition-colors"
            >
              <Instagram className="inline-block" size={24} />
            </a>
          </h1>
          <p className="text-white/90 mt-2">Fashion & Lifestyle Influencer</p>
          <p className="text-sm text-white/80 mt-1">Shop my favorite products! ✨</p>
        </div>

        {true && (
          <button
            onClick={() => {
              setEditingLink(null);
              setNewLink({ name: '', description: '', affiliateLink: '', price: '', image: '' ,id:1});
              setisModalOpen(true);
            }}
            className="w-full mb-6 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
        <FaPlus size={20} />
            Add New Link
          </button>
        )}

        {/* Product Links */}
        <div className="space-y-4">
          {Links.map((product) => (
            <a
              key={product.id}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all relative hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              
              {true && (
                <>
                  <button
                    onClick={() => {console.log('Delete')}}
                    className="absolute  top-2 right-2 z-50 p-1 rounded-full  text-red-500  transition-opacity bg-red-200"
                  >
                    <IoMdClose size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setisModalOpen(true);}}
                    className="absolute top-2 right-10 z-50 p-1 rounded-full bg-blue-100 text-blue-500 "
                  >
                    <TbEdit size={16} />
                  </button>
                </>
              )}

                <div className="flex items-center p-1 sm:p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <span className="text-pink-500 font-semibold">  

                        {/* putprice here */}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                  <div className="ml-4">
                    <div className=" ">
                      {/* put linlke logo */}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex justify-center gap-3">
          <button className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95">
            <Heart size={20} className="text-pink-500" />
          </button>
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">1.2k+ Happy Customers</p>
          </div>
        </div>


jknkjnkjn






        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingLink ? 'Edit Link' : 'Add New Link'}
                </h2>
                <button
                  onClick={() => setisModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <IoMdClose size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newLink.name}
                    onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newLink.description}
                    onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="url"
                    value={newLink.affiliateLink}
                    onChange={(e) => setNewLink({ ...newLink, affiliateLink: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                   Option 1: Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newLink.image}
                      onChange={(e) => setNewLink({ ...newLink, image: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="flex-shrink-0 w-10 h-10 border rounded-lg overflow-hidden">
                      {newLink.image ? (
                        <img
                          src={newLink.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FaImage size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>



 {/* File Upload */}
 <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Option 2: Upload from Device
                      </label>
                     
                    </div>



                         {/* Image Preview */}
                         <div className="mt-4">
                      <label className="block text-sm text-gray-600 mb-2"></label>
                      <div className="w-full h-40 border rounded-lg overflow-hidden bg-gray-50">
                        {newLink.image ? (
                          <img
                            src={newLink.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center relative text-gray-400">
                          <FaImage size={32} />
                          <div>Click to upload</div>
                          <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         
                          />
                          
                        </div>
                        )}
                      </div>
                      {newLink.image && (
                        <button
                          onClick={() => setNewLink({ ...newLink, image: '' })}
                          className="mt-2 text-sm text-red-500 hover:text-red-600"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
            



                <button
                  onClick={editingLink ? handleSaveEdit : handleAddLink}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaSave size={20} />
                  {editingLink ? 'Save Changes' : 'Save Link'}
                </button>
              </div>
            </div>
          </div>
        )}








        

        {/* Footer */}
        <footer className="mt-12 text-center text-white/70">
          <p className="text-sm">© 2024 lifestyle.beauty • All rights reserved</p>
          <p className="text-xs mt-1">Contains affiliate links</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;

// Removed local declaration of useEffect
