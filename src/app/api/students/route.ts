// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(req: NextRequest) {
//     try {
//         const {
//             firstName,
//             lastName,
//             age,
//             phone,
//             classId,
//             routeId,
//             teacher,
//             address,
//             year,
//             source,
//             useTransport,
//         } = await req.json(); // Parse request body

//         // Validate input data
//         if (!firstName || !lastName || !age || !phone || !classId || !year) {
//             return NextResponse.json(
//                 { success: false, message: 'Missing required fields' },
//                 { status: 400 }
//             );
//         }

//         // Attempt to create the student entry in the database using Prisma
//         const student = await prisma.student.create({
//             data: {
//                 firstName,
//                 lastName,
//                 age: Number(age),
//                 phone,
//                 classId: Number(classId),
//                 routeId: routeId ? Number(routeId) : null,  // Handle optional routeId
//                 teacher,
//                 address,
//                 year: Number(year),
//                 source,
//                 useTransport: Boolean(useTransport),
//             },
//         });

//         // Respond with success and the newly created student data
//         return NextResponse.json({ success: true, data: student }, { status: 201 });
//     } catch (error) {
//         console.error('Error adding student:', error);
//         return NextResponse.json(
//             { success: false, message: 'Error adding student', error: error.message },
//             { status: 500 }
//         );
//     }
// }


// export async function GET(req: NextRequest) {
//     try {
//         // Retrieve all students from the database using Prisma
//         const students = await prisma.student.findMany();

//         return NextResponse.json({ success: true, data: students }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching students:', error);
//         return NextResponse.json(
//             { success: false, message: 'Error fetching students', error: error.message },
//             { status: 500 }
//         );
//     }
// }
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const {
            firstName,
            lastName,
            age,
            phone,
            classId,
            routeId,
            teacher,
            address,
            year,
            source,
            useTransport,
        } = await req.json(); // Parse request body

        // Validate input data
        if (!firstName || !lastName || !age || !phone || !classId || !year) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Attempt to create the student entry in the database using Prisma
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                age: Number(age),
                phone,
                classId: Number(classId),
                routeId: routeId ? Number(routeId) : null, // Handle optional routeId
                teacher,
                address,
                year: Number(year),
                source,
                useTransport: Boolean(useTransport),
            },
        });

        // Respond with success and the newly created student data
        return NextResponse.json({ success: true, data: student }, { status: 201 });
    } catch (error) {
        // Type assertion for error
        const errorMessage = (error as Error).message || 'Unknown error';
        console.error('Error adding student:', errorMessage);
        return NextResponse.json(
            { success: false, message: 'Error adding student', error: errorMessage },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        // Retrieve all students from the database using Prisma
        const students = await prisma.student.findMany();

        return NextResponse.json({ success: true, data: students }, { status: 200 });
    } catch (error) {
        // Type assertion for error
        const errorMessage = (error as Error).message || 'Unknown error';
        console.error('Error fetching students:', errorMessage);
        return NextResponse.json(
            { success: false, message: 'Error fetching students', error: errorMessage },
            { status: 500 }
        );
    }
}
