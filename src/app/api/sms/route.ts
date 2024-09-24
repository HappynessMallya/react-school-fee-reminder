import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { class_id } = req.body;

        try {
            // Fetch students with pending payment status from the selected class
            const students = await prisma.student.findMany({
                where: { classId: Number(class_id), paymentStatus: 'PENDING' },
            });

            // Send SMS to each student
            const promises = students.map((student) =>
                client.messages.create({
                    body: `Reminder: Your payment is pending. Please complete it as soon as possible.`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: student.phone,
                })
            );

            await Promise.all(promises);

            res.status(200).json({ success: true, message: 'SMS reminders sent successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error sending reminders', error });
        }
    }
}
