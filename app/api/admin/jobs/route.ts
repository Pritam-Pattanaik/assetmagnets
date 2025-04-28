import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth-options';
import prisma from '@/lib/prisma';

// GET handler to fetch all job listings
export async function GET(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get query parameters for filtering
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const search = searchParams.get('search');

        // Build the query
        const query: any = {};

        // Add filters if provided
        if (status === 'active') query.active = true;
        if (status === 'inactive') query.active = false;
        if (type && type !== 'all') query.type = type;
        if (search) {
            query.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Fetch job listings with application count
        const jobs = await prisma.jobListing.findMany({
            where: query,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error fetching job listings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch job listings' },
            { status: 500 }
        );
    }
}

// POST handler to create a new job listing
export async function POST(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse request body
        const data = await req.json();

        // Validate required fields
        const requiredFields = ['title', 'description', 'requirements', 'responsibilities', 'location', 'type'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Generate slug from title
        const slug = data.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');

        // Check if slug already exists
        const existingJob = await prisma.jobListing.findUnique({
            where: { slug },
        });

        if (existingJob) {
            return NextResponse.json(
                { error: 'A job with a similar title already exists' },
                { status: 400 }
            );
        }

        // Create new job listing
        const newJob = await prisma.jobListing.create({
            data: {
                title: data.title,
                slug,
                description: data.description,
                requirements: data.requirements,
                responsibilities: data.responsibilities,
                location: data.location,
                type: data.type,
                salary: data.salary || null,
                active: data.active !== undefined ? data.active : true,
            },
        });

        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error('Error creating job listing:', error);
        return NextResponse.json(
            { error: 'Failed to create job listing' },
            { status: 500 }
        );
    }
}

// PATCH handler to update a job listing
export async function PATCH(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get job ID from URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Job ID is required' },
                { status: 400 }
            );
        }

        // Check if job exists
        const existingJob = await prisma.jobListing.findUnique({
            where: { id },
        });

        if (!existingJob) {
            return NextResponse.json(
                { error: 'Job listing not found' },
                { status: 404 }
            );
        }

        // Parse request body
        const data = await req.json();

        // Update job listing
        const updatedJob = await prisma.jobListing.update({
            where: { id },
            data: {
                title: data.title !== undefined ? data.title : undefined,
                description: data.description !== undefined ? data.description : undefined,
                requirements: data.requirements !== undefined ? data.requirements : undefined,
                responsibilities: data.responsibilities !== undefined ? data.responsibilities : undefined,
                location: data.location !== undefined ? data.location : undefined,
                type: data.type !== undefined ? data.type : undefined,
                salary: data.salary !== undefined ? data.salary : undefined,
                active: data.active !== undefined ? data.active : undefined,
            },
        });

        return NextResponse.json(updatedJob);
    } catch (error) {
        console.error('Error updating job listing:', error);
        return NextResponse.json(
            { error: 'Failed to update job listing' },
            { status: 500 }
        );
    }
}

// DELETE handler to delete a job listing
export async function DELETE(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get job ID from URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Job ID is required' },
                { status: 400 }
            );
        }

        // Check if job exists
        const existingJob = await prisma.jobListing.findUnique({
            where: { id },
        });

        if (!existingJob) {
            return NextResponse.json(
                { error: 'Job listing not found' },
                { status: 404 }
            );
        }

        // First delete all associated job applications
        await prisma.jobApplication.deleteMany({
            where: { jobListingId: id },
        });

        // Then delete the job listing
        await prisma.jobListing.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting job listing:', error);

        // Provide more specific error message
        let errorMessage = 'Failed to delete job listing';
        if (error instanceof Error) {
            // Check if it's a foreign key constraint error
            if (error.message.includes('foreign key constraint')) {
                errorMessage = 'Cannot delete job listing because it has associated applications';
            } else {
                // Include the actual error message for better debugging
                errorMessage = `Failed to delete job listing: ${error.message}`;
            }
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}