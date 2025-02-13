
//@ts-nocheck
import axios from "axios";
import { Heart } from 'lucide-react';


async function fetchPageData(pageId: string) {
  try {
    const res = await axios.post(`http://localhost:3000/api/landing?pageId=${pageId}`, { pageId });
    return res.data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { hashedId } = await params;
  console.log(params);
  const data = await fetchPageData(hashedId);

  if (!data) return <div>Page Not Found</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500 to-pink-500 py-8 px-4 transition-colors duration-500">
      <div className="max-w-lg mx-auto">
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

        {/* Product Data */}
        <div className="space-y-4">
          {data && (
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <pre className="text-gray-800 overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
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