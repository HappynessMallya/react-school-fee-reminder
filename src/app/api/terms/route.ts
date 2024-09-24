import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path to your Prisma client

// GET Method to Fetch Terms
export async function GET() {
  try {
    const terms = await prisma.term.findMany();
    return NextResponse.json({ success: true, data: terms });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch terms', error });
  }
}

// POST Method to Add a Term
export async function POST(req: Request) {
  try {
    const { term_name, year } = await req.json();
    const newTerm = await prisma.term.create({
      data: {
        term_name,
        year,
      },
    });
    return NextResponse.json({ success: true, data: newTerm });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to add term', error });
  }
}
