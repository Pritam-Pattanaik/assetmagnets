import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch all active job listings for the public career page
export async function GET(req: NextRequest) {
    try {
        // Get query parameters for filtering (optional for future enhancements)
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        // Build the query - only show active jobs
        const query: any = { active: true };

        // Add type filter if provided
        if (type && type !== 'all') {
            query.type = type;
        }

        // Fetch active job listings
        const jobs = await prisma.jobListing.findMany({
            where: query,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                requirements: true,
                responsibilities: true,
                location: true,
                type: true,
                salary: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error fetching public job listings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch job listings' },
            { status: 500 }
        );
    }
}