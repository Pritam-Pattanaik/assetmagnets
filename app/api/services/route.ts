import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-options';

// GET handler to fetch all services
export async function GET(req: NextRequest) {
    try {
        // Get query parameters for filtering
        const { searchParams } = new URL(req.url);
        const active = searchParams.get('active');

        // Build the query
        const query: any = {};

        // Add active filter if provided
        if (active === 'true') {
            query.active = true;
        } else if (active === 'false') {
            query.active = false;
        }

        // Fetch services
        const services = await prisma.service.findMany({
            where: query,
            orderBy: { title: 'asc' },
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST handler to create a new service
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
        if (!data.title || !data.description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        // Generate slug from title if not provided
        if (!data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');
        }

        // Create new service
        const service = await prisma.service.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                icon: data.icon || null,
                color: data.color || 'from-blue-500 to-blue-600',
                details: data.details || [],
                active: data.active !== undefined ? data.active : true,
            },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error: any) {
        console.error('Error creating service:', error);

        // Handle unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A service with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}