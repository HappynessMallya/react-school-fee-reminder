import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { studentIds, newClassId } = req.body;

        try {
            await prisma.student.updateMany({
                where: { id: { in: studentIds.map(Number) } },
                data: { classId: Number(newClassId) },
            });

            res.status(200).json({ success: true, message: 'Students moved successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error moving students', error });
        }
    }
}
