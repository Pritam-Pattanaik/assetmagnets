import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import fs from 'fs';

// Helper function to ensure directory exists
async function ensureDirectoryExists(dirPath: string) {
    try {
        // Check if directory exists
        if (!fs.existsSync(dirPath)) {
            // Create directory recursively
            await mkdir(dirPath, { recursive: true });
            console.log(`Created directory: ${dirPath}`);
        }
    } catch (error) {
        console.error(`Error creating directory ${dirPath}:`, error);
        throw new Error('Failed to create upload directory');
    }
}

// This is a temporary solution for handling file uploads
// In a production environment, you would use a proper storage solution
// like AWS S3, Google Cloud Storage, or similar
async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const filename = `${uuidv4()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
    const filepath = path.join(uploadDir, filename);

    try {
        // Ensure the directory exists
        await ensureDirectoryExists(uploadDir);

        // Write the file
        await writeFile(filepath, buffer);
        return `/uploads/resumes/${filename}`;
    } catch (error) {
        console.error('Error saving file:', error);
        throw new Error('Failed to save resume file');
    }
}

export async function POST(request: NextRequest) {
    // Verify database connection
    try {
        await prisma.$connect();
    } catch (connectionError) {
        console.error('Failed to connect to database:', connectionError);
        return NextResponse.json(
            { error: 'Database connection error' },
            { status: 500 }
        );
    }
    try {
        // Parse the multipart form data
        const formData = await request.formData();

        // Extract form fields
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const coverLetter = formData.get('coverLetter') as string;
        const jobId = formData.get('jobId') as string;
        const resumeFile = formData.get('resume') as File;

        // Validate required fields
        if (!name || !email || !jobId || !resumeFile) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate jobId format (should be a valid cuid)
        // CUID format validation - less strict than UUID to accommodate the cuid() format
        if (!jobId || typeof jobId !== 'string') {
            console.error('Invalid jobId format:', jobId);
            return NextResponse.json(
                { error: 'Invalid job ID format' },
                { status: 400 }
            );
        }

        // Save the resume file
        const resumeUrl = await saveFile(resumeFile);

        // Get job details to populate position field
        const jobListing = await prisma.jobListing.findUnique({
            where: { id: jobId },
            select: { title: true }
        });

        if (!jobListing) {
            return NextResponse.json(
                { error: 'Job listing not found' },
                { status: 404 }
            );
        }

        // Save the application data to the database using Prisma
        let application;
        try {
            application = await prisma.jobApplication.create({
                data: {
                    name,
                    email,
                    phone: phone || null, // Ensure phone is null if not provided
                    coverLetter: coverLetter || null, // Ensure coverLetter is null if not provided
                    resumeUrl,
                    position: jobListing.title,
                    jobListing: {
                        connect: {
                            id: jobId
                        }
                    },
                    status: 'RECEIVED',
                },
            });

            console.log('Job application created successfully with ID:', application.id);
        } catch (dbError) {
            console.error('Database error creating job application:', dbError);
            throw new Error(`Database error: ${dbError instanceof Error ? dbError.message : 'Unknown database error'}`);
        }

        // Log the application data for debugging purposes
        console.log('Job application received:', {
            name,
            email,
            phone,
            jobId,
            resumeUrl,
            coverLetter: coverLetter ? `${coverLetter.substring(0, 50)}...` : null,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Application submitted successfully',
                application: application
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error processing application:', error);

        // Provide more detailed error information
        let errorMessage = 'Failed to process application';
        if (error instanceof Error) {
            errorMessage = `${errorMessage}: ${error.message}`;
            console.error('Error stack:', error.stack);

            // Log additional details for Prisma errors
            if (error.name === 'PrismaClientKnownRequestError' ||
                error.name === 'PrismaClientValidationError') {
                console.error('Prisma error details:', JSON.stringify(error, null, 2));
            }
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}