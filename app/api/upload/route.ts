import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:'dkcrdxvio',
    
    api_key:'839813111465819',
    api_secret:'UadDxmxjz1c_-IsO1YZFNjCm9SI'
});


export async function POST(request: Request) {
  try {
    
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {

      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const fileStr = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${fileStr}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'next-uploads',
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { error: 'Error uploading image' },
      { status: 500 }
    );
  }
}