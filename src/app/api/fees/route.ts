import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure prisma client is correctly set up

// GET Method to Fetch all Fees (Optional: depending on your needs)
export async function GET() {
  try {
    const fees = await prisma.fee.findMany({
      include: {
        class: true,
        term: true,
        route: true,
      },
    });
    return NextResponse.json({ success: true, data: fees });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch fees",
      error,
    });
  }
}

// POST Method to Add a Fee
export async function POST(req: Request) {
  try {
    const { class_id, term_id, route_id, fee_amount } = await req.json();

    // Insert the fee into the database
    const newFee = await prisma.fee.create({
      data: {
        fee_amount,
        year: new Date().getFullYear(), // Assuming you are setting the year dynamically
        class: { connect: { id: class_id } },
        term: { connect: { id: term_id } },
        route: route_id ? { connect: { id: route_id } } : undefined,
      },
    });

    return NextResponse.json({ success: true, data: newFee });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to add fee",
      error,
    });
  }
}
