import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust the path as necessary

// Define interfaces for type safety
interface PaymentRequest {
  student_id: number; // You can add this to associate payments with students
  class_id: number;
  term_id: number;
  amount: number;
}

// POST method to create a payment
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { student_id, class_id, term_id, amount }: PaymentRequest = req.body;

  try {
    // Create the payment record
    const payment = await prisma.payment.create({
      data: {
        amount: amount,
        studentId: student_id, // Associate payment with student
        classId: class_id,
        termId: term_id,
      },
    });

    return res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// GET method to retrieve all payments
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        student: true, // Include related student details
        class: true,   // Include related class details
        term: true,    // Include related term details
      },
    });

    return res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
