import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    try {
        // Check if admin user already exists
        const existingAdmin = await prisma.user.findUnique({
            where: {
                email: 'admin@example.com',
            },
        });

        if (!existingAdmin) {
            // Create admin user if it doesn't exist
            const hashedPassword = await hash('admin123', 10);

            const admin = await prisma.user.create({
                data: {
                    name: 'Admin User',
                    email: 'admin@example.com',
                    password: hashedPassword,
                    role: 'ADMIN',
                    emailVerified: new Date(),
                },
            });

            console.log(`Created admin user: ${admin.email}`);
        } else {
            console.log('Admin user already exists');
        }

        // Create a test job listing for the career page
        const jobListing = await prisma.jobListing.upsert({
            where: { slug: 'senior-software-engineer' },
            update: {},
            create: {
                title: 'Senior Software Engineer',
                slug: 'senior-software-engineer',
                description: 'We are looking for an experienced Software Engineer to design, develop and implement high-quality software solutions.',
                requirements: '5+ years of experience in software development, Proficiency in JavaScript, TypeScript, and React, Experience with Node.js and Express, Knowledge of cloud platforms (AWS, Azure, or GCP), Strong problem-solving skills and attention to detail',
                responsibilities: 'Design and implement high-quality software solutions, Collaborate with cross-functional teams, Write clean and maintainable code, Participate in code reviews, Troubleshoot and debug applications',
                location: 'Remote / Hybrid',
                type: 'FULL_TIME',
                active: true,
            },
        });

        console.log('Created/updated job listing:', jobListing.title);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });