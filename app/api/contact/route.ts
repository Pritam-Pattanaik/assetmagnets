import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET handler to fetch all contact information
export async function GET() {
    try {
        // Fetch all branch offices
        const branches = await prisma.contactInfo.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Fetch all social media links
        const socialMedia = await prisma.socialMedia.findMany({
            where: {
                isActive: true
            }
        });

        return NextResponse.json({ branches, socialMedia }, { status: 200 });
    } catch (error) {
        console.error('Error fetching contact information:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact information' },
            { status: 500 }
        );
    }
}

// POST handler to create or update contact information
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { branches, socialMedia } = data;

        // Process branches data
        if (branches && Array.isArray(branches)) {
            // Delete existing branches that are not in the new data
            const existingBranches = await prisma.contactInfo.findMany({
                select: { id: true }
            });

            const existingIds = existingBranches.map(branch => branch.id);
            const newIds = branches.filter(branch => branch.id).map(branch => branch.id);

            const idsToDelete = existingIds.filter(id => !newIds.includes(id));

            if (idsToDelete.length > 0) {
                await prisma.contactInfo.deleteMany({
                    where: {
                        id: { in: idsToDelete }
                    }
                });
            }

            // Create or update branches
            for (const branch of branches) {
                if (branch.id && existingIds.includes(branch.id)) {
                    // Update existing branch
                    await prisma.contactInfo.update({
                        where: { id: branch.id },
                        data: {
                            name: branch.name,
                            country: branch.country,
                            address: branch.address,
                            phone: branch.phone,
                            email: branch.email,
                            officeHours: branch.officeHours,
                            isDefault: branch.isDefault || false
                        }
                    });
                } else {
                    // Create new branch
                    await prisma.contactInfo.create({
                        data: {
                            name: branch.name,
                            country: branch.country,
                            address: branch.address,
                            phone: branch.phone || '',
                            email: branch.email || '',
                            officeHours: branch.officeHours || '',
                            isDefault: branch.isDefault || false
                        }
                    });
                }
            }
        }

        // Process social media data
        if (socialMedia && typeof socialMedia === 'object') {
            // Get existing social media entries
            const existingSocialMedia = await prisma.socialMedia.findMany({
                select: { id: true, platform: true }
            });

            // Update or create social media entries
            for (const [platform, url] of Object.entries(socialMedia)) {
                const existing = existingSocialMedia.find(sm => sm.platform === platform);

                if (existing) {
                    // Update existing entry
                    await prisma.socialMedia.update({
                        where: { id: existing.id },
                        data: { url: url as string }
                    });
                } else {
                    // Create new entry
                    await prisma.socialMedia.create({
                        data: {
                            platform,
                            url: url as string
                        }
                    });
                }
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error updating contact information:', error);
        return NextResponse.json(
            { error: 'Failed to update contact information' },
            { status: 500 }
        );
    }
}