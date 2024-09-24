// 
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this path is correct

// GET Method to Fetch Classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany();
    return NextResponse.json({ success: true, data: classes });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch classes', error });
  }
}

// POST Method to Add a Class
export async function POST(req: Request) {
  try {
    const { class_name, year } = await req.json();
    const newClass = await prisma.class.create({
      data: {
        class_name,
        year,
      },
    });
    return NextResponse.json({ success: true, data: newClass });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to add class', error });
  }
}

// PUT Method to Update a Class
export async function PUT(req: Request) {
  const { id, class_name, year } = await req.json();
  try {
    const updatedClass = await prisma.class.update({
      where: { id: parseInt(id) },
      data: { class_name, year: parseInt(year) },
    });
    return NextResponse.json({ success: true, data: updatedClass });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update class', error });
  }
}

// DELETE Method for Deleting a Class
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const deletedClass = await prisma.class.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true, data: deletedClass });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete class', error });
  }
}
