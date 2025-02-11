"use client"
import React, { useEffect, useState } from 'react';
import { Instagram, ExternalLink, Heart, ShoppingBag, Palette } from 'lucide-react';
import { useSession } from 'next-auth/react';
interface Product {
  id: number;
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

  useEffect(() => {

  console.log(session?.user?.name);


}, []);

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
              className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
            >
              <Palette size={20} className="text-gray-600" />
            </button>
            
            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
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

        {/* Product Links */}
        <div className="space-y-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center p-3 sm:p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <span className="text-pink-500 font-semibold">{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                  <div className="ml-4">
                    <div className="bg-gradient-to-br from-pink-400 to-purple-500 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <ShoppingBag size={20} />
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
