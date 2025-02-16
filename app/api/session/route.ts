import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma= new PrismaClient();
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const {pageId}= await req.json()

 

  const Cookie = cookieStore.getAll();
console.log(Cookie)
 
//  const pp =   await prisma.landingPage.update({
//         where: { hashedId:pageId  }, // Replace with the actual ID
//         data: {
//           vists: { increment: 1 } // Replace with the actual field name
//         }
//       });

    //   cookieStore.set('shopmypost', encodeURIComponent(JSON.stringify([pageId])), {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    //     maxAge: 60 * 60 * 24 * 7 // 1 week
    //   });
      return NextResponse.json('ok');
  

 
}