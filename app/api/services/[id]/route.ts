import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-options';

// GET handler to fetch a specific service by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const service = await prisma.service.findUnique({
            where: { id },
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service' },
            { status: 500 }
        );
    }
}

// PUT handler to update a service
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const data = await req.json();

        // Validate required fields
        if (!data.title || !data.description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        // Check if service exists
        const existingService = await prisma.service.findUnique({
            where: { id },
        });

        if (!existingService) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        // Update service
        const updatedService = await prisma.service.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug || existingService.slug,
                description: data.description,
                icon: data.icon,
                color: data.color,
                details: data.details || [],
                active: data.active !== undefined ? data.active : existingService.active,
            },
        });

        return NextResponse.json(updatedService);
    } catch (error: any) {
        console.error('Error updating service:', error);

        // Handle unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A service with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

// PATCH handler to partially update a service (e.g., toggle active status)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const data = await req.json();

        // Check if service exists
        const existingService = await prisma.service.findUnique({
            where: { id },
        });

        if (!existingService) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        // Update service with only the provided fields
        const updatedService = await prisma.service.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedService);
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

// DELETE handler to delete a service
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Check authentication and authorization
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        // Check if service exists
        const existingService = await prisma.service.findUnique({
            where: { id },
        });

        if (!existingService) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        // Delete service
        await prisma.service.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}