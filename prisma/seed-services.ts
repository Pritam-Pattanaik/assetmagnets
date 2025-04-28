import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding services...');

    // Check if services already exist
    const existingServicesCount = await prisma.service.count();

    if (existingServicesCount > 0) {
        console.log(`Found ${existingServicesCount} existing services. Skipping seed.`);
        return;
    }

    // Initial services data
    const servicesData = [
        {
            name: 'Software Development', // Adding name field to match Prisma schema requirement
            title: 'Software Development',
            slug: 'software-development',
            description: 'Custom software solutions tailored to your business needs, from web applications to enterprise systems.',
            icon: 'FaCode',
            color: 'from-blue-500 to-blue-600',
            details: [
                'Custom web application development',
                'Enterprise software solutions',
                'API development and integration',
                'Legacy system modernization',
                'Quality assurance and testing'
            ],
            active: true
        },
        {
            name: 'Cloud Solutions', // Adding name field to match Prisma schema requirement
            title: 'Cloud Solutions',
            slug: 'cloud-solutions',
            description: 'Secure and scalable cloud infrastructure, migration services, and managed cloud solutions.',
            icon: 'FaCloud',
            color: 'from-pink-400 to-pink-500',
            details: [
                'Cloud migration and deployment',
                'Infrastructure as a Service (IaaS)',
                'Platform as a Service (PaaS)',
                'Software as a Service (SaaS)',
                'Cloud optimization and management'
            ],
            active: true
        },
        {
            name: 'Cybersecurity', // Adding name field to match Prisma schema requirement
            title: 'Cybersecurity',
            slug: 'cybersecurity',
            description: 'Comprehensive security solutions to protect your business from threats and ensure data integrity.',
            icon: 'FaShieldAlt',
            color: 'from-green-500 to-green-600',
            details: [
                'Security assessment and auditing',
                'Threat detection and prevention',
                'Data protection and encryption',
                'Security awareness training',
                'Compliance and regulatory support'
            ],
            active: true
        },
        {
            name: 'Digital Transformation', // Adding name field to match Prisma schema requirement
            title: 'Digital Transformation',
            slug: 'digital-transformation',
            description: 'Strategic guidance and implementation to modernize your business processes and technology.',
            icon: 'FaChartLine',
            color: 'from-purple-500 to-purple-600',
            details: [
                'Digital strategy development',
                'Business process automation',
                'Data analytics and insights',
                'Customer experience enhancement',
                'Technology roadmap planning'
            ],
            active: true
        },
        {
            name: 'IT Consulting', // Adding name field to match Prisma schema requirement
            title: 'IT Consulting',
            slug: 'it-consulting',
            description: 'Expert advice on technology strategy, architecture, and implementation to drive business growth.',
            icon: 'FaLaptopCode',
            color: 'from-yellow-500 to-yellow-600',
            details: [
                'IT strategy and planning',
                'Technology assessment',
                'Vendor selection and management',
                'Project management',
                'IT governance and compliance'
            ],
            active: true
        },
        {
            name: 'Mobile Development', // Adding name field to match Prisma schema requirement
            title: 'Mobile Development',
            slug: 'mobile-development',
            description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
            icon: 'FaMobileAlt',
            color: 'from-red-500 to-red-600',
            details: [
                'iOS and Android app development',
                'Cross-platform development',
                'Mobile UI/UX design',
                'App maintenance and support',
                'Mobile app testing and optimization'
            ],
            active: true
        },
    ];

    // Create services in database
    for (const service of servicesData) {
        await prisma.service.create({
            data: service
        });
    }

    console.log(`Created ${servicesData.length} services`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });