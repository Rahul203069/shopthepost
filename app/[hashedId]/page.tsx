
//@ts-nocheck
import axios from "axios";
import { Heart, Instagram, ExternalLink } from 'lucide-react';

async function fetchPageData(pageId: string) {
  try {
    const res = await axios.get(`http://localhost:3000/api/landing?pageId=${pageId}`);
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
    <div className={`min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${data?.theme || "from-purple-500 to-pink-500"} py-8 px-4 transition-colors duration-500`}>
      <div className="max-w-lg mx-auto">

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={data.user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
            {data.user.name}
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
          {data && data.productCards.map((product) => (
            <a
              key={product.id}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className=" cursor-pointer bg-white/95 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all relative hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center p-1 sm:p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{product.title}</h3>
                      <span className="text-pink-500 font-semibold">
                        {/* Put price here */}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                  {/* Redirect Icon */}
                  <div className="ml-4">
                    <ExternalLink size={20} className="text-gray-500 group-hover:text-gray-800 transition-colors" />
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
