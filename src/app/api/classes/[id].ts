// src/pages/api/classes/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case 'PUT':
      // Update class
      const { class_name, year } = req.body;
      const updatedClass = await prisma.class.update({
        where: { id: Number(id) },
        data: { class_name, year: parseInt(year) },
      });
      res.status(200).json(updatedClass);
      break;
    case 'DELETE':
      // Delete class
      await prisma.class.delete({ where: { id: Number(id) } });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
