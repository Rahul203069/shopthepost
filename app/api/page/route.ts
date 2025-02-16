 // @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { create } from "domain";
import crypto from "crypto";



const hashUUID = (uuid) => {
    const hash = crypto.createHash("md5").update(uuid).digest("hex"); 
    return parseInt(hash.substring(0, 6), 16).toString(36).slice(0, 4);
  };
  


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json(
      { error: "Missing title or description" },
      { status: 400 }
    );
  }

  try {
    // Fetch user ID from the database using the session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const page = await prisma.landingPage.create({
      data: {
        title:title,
        discription: description,
        userId: user.id,
      },
    });
    const hashedId = hashUUID(page.id);
    await prisma.landingPage.update({
      where: { id: page.id },
      data: { hashedId: hashedId.toString() },
    });

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user ID from the database using the session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        landingPages:{
            orderBy:{createdAt:"desc"}
        }, // Include user's landing pages
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.landingPages);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
console.log(id);
  if (!id) {
    return NextResponse.json({ error: "Missing landing page ID" }, { status: 400 });
  }

  try {
    // Fetch user ID from the database using the session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the landing page belongs to the user
    const page = await prisma.landingPage.findUnique({
      where: { id: id },
    });

    if (!page || page.userId !== user.id) {
      return NextResponse.json({ error: "Landing page not found or unauthorized" }, { status: 404 });
    }

    // Delete the landing page
    await prisma.landingPage.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Landing page deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}