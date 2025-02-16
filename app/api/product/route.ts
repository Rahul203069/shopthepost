import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
      // Parse the request body
      const { id } = await req.json();
  console.log(id);
      // Get the current session
      const session = await getServerSession(authOptions);
  
      // Check if the product exists and belongs to the user
      const product = await prisma.productCard.findUnique({ where: { id } });
  
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      const page = await prisma.landingPage.findUnique({ where: { id: product.landingPageId } });
  
      if (!page || page.userId !== session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // Delete the product
   const p=   await prisma.productCard.delete({ where: { id } });
  console.log(p);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
        console.log(e);
      return NextResponse.json({ error:e }, { status: 500 });
    }
  }



  export async function POST(req: NextRequest) {
    // Extract the page id from the URL
    const pageid = req.url.split('=')[1];
    
    // Parse the request body to get the theme
    const { theme } = await req.json();
    
    console.log('Page ID:', pageid);
  
    try {
      // Update the landing page with the new theme
     const the= await prisma.landingPage.update({
        where: { hashedId: pageid },
        data: { theme },
      });
      console.log(the,'hee');
      return NextResponse.json({ success: true, the }, { status: 200 });
    } catch (error: any) {
      console.log('Error updating landing page:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }