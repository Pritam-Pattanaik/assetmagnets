import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth-options';
import prisma from '@/lib/prisma';

// PATCH handler to update application status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'Application ID is required' },
                { status: 400 }
            );
        }

        // Parse request body
        const body = await req.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        // Validate status value
        const validStatuses = ['RECEIVED', 'REVIEWING', 'INTERVIEW', 'REJECTED', 'ACCEPTED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status value' },
                { status: 400 }
            );
        }

        // Check if application exists
        const existingApplication = await prisma.jobApplication.findUnique({
            where: { id },
        });

        if (!existingApplication) {
            return NextResponse.json(
                { error: 'Application not found' },
                { status: 404 }
            );
        }

        // Update application status
        const updatedApplication = await prisma.jobApplication.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedApplication);
    } catch (error) {
        console.error('Error updating application status:', error);
        return NextResponse.json(
            { error: 'Failed to update application status' },
            { status: 500 }
        );
    }
}