import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path to your Prisma client

// GET Method to Fetch Routes
export async function GET() {
  try {
    const routes = await prisma.route.findMany();
    return NextResponse.json({ success: true, data: routes });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch routes', error });
  }
}

// POST Method to Add a Route
export async function POST(req: Request) {
  try {
    const { route_name, year } = await req.json();
    const newRoute = await prisma.route.create({
      data: {
        route_name,
        year,
      },
    });
    return NextResponse.json({ success: true, data: newRoute });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to add route', error });
  }
}
