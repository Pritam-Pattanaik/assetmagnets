import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth-options';
import prisma from '@/lib/prisma';

// GET handler to fetch all job applications
export async function GET(req: NextRequest) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        // Build the query
        const query: any = {};

        // Add filters if provided
        if (status && status !== 'all') query.status = status;
        if (search) {
            query.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Fetch all applications with job details
        const applications = await prisma.jobApplication.findMany({
            where: query,
            orderBy: { createdAt: 'desc' },
            include: {
                jobListing: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch job applications' },
            { status: 500 }
        );
    }
}