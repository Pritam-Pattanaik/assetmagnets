import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth-options';
import prisma from '@/lib/prisma';

// GET handler to fetch applications for a specific job
export async function GET(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get job ID from query parameters
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get('jobId');
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        if (!jobId) {
            return NextResponse.json(
                { error: 'Job ID is required' },
                { status: 400 }
            );
        }

        // Check if job exists
        const job = await prisma.jobListing.findUnique({
            where: { id: jobId },
            select: { id: true, title: true, slug: true }
        });

        if (!job) {
            return NextResponse.json(
                { error: 'Job listing not found' },
                { status: 404 }
            );
        }

        // Build the query
        const query: any = { jobListingId: jobId };

        // Add filters if provided
        if (status && status !== 'all') query.status = status;
        if (search) {
            query.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Fetch applications
        const applications = await prisma.jobApplication.findMany({
            where: query,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            jobDetails: job,
            applications,
        });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch job applications' },
            { status: 500 }
        );
    }
}

// PATCH handler to update application status
export async function PATCH(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get application ID from URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Application ID is required' },
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

        // Parse request body
        const data = await req.json();

        // Validate status
        const validStatuses = ['RECEIVED', 'REVIEWING', 'INTERVIEW', 'REJECTED', 'ACCEPTED'];
        if (data.status && !validStatuses.includes(data.status)) {
            return NextResponse.json(
                { error: 'Invalid status value' },
                { status: 400 }
            );
        }

        // Update application
        const updatedApplication = await prisma.jobApplication.update({
            where: { id },
            data: {
                status: data.status,
                // Add other fields that can be updated if needed
            },
        });

        return NextResponse.json(updatedApplication);
    } catch (error) {
        console.error('Error updating job application:', error);
        return NextResponse.json(
            { error: 'Failed to update job application' },
            { status: 500 }
        );
    }
}

// DELETE handler to delete an application
export async function DELETE(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get application ID from URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Application ID is required' },
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

        // Delete application
        await prisma.jobApplication.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting job application:', error);
        return NextResponse.json(
            { error: 'Failed to delete job application' },
            { status: 500 }
        );
    }
}