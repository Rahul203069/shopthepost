//@ts-ignore
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/utils/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract hashedId from the URL path
    const  hashedId  = await req.url.split("?")[1].split("=")[1];
console.log(hashedId,'heheheh');
    // Validate hashedId
    if (!hashedId) {
      return NextResponse.json({ error: "Missing page ID" }, { status: 400 });
    }

    // Fetch the landing page
    const page = await prisma.landingPage.findUnique({ where: { hashedId }, include: { productCards: true } });

    // Handle case where no page is found
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Return page data
    return NextResponse.json(page, { status: 200 });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}



export async function POST(req: NextRequest) {
    try {
      // Parse the request body
      const { title, description, image, url, id } = await req.json();
  console.log(title, description, image, url, id);
      // Get the current session
      const session = await getServerSession(authOptions);
  
      // Check if the landing page exists and belongs to the user
      const page = await prisma.landingPage.findUnique({ where: { hashedId:id } });
  
      if (!page) {
        return NextResponse.json({ error: "Landing page not found" }, { status: 404 });
      }
  
      if (page.userId !== session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // Create the product
      const product = await prisma.productCard.create({
        data: {
          title,
          description,
          imageUrl: image,
          link: url,
          landingPageId: page.id,
          price:0

        },
      });
  
      return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error) {
    
      return NextResponse.json({ error }, { status: 500 });
    }
  }