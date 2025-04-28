import { CompanyTimeline } from '@/components/about/CompanyTimeline';
import { FaCode, FaCloud, FaShieldAlt, FaChartLine, FaLaptopCode, FaMobileAlt, FaTools } from 'react-icons/fa';
import prisma from '@/lib/prisma';

export const metadata = {
    title: 'Our Services | ASSET-MAGNETS',
    description: 'Explore our comprehensive range of IT services including software development, cloud solutions, cybersecurity, and digital transformation.',
};

// Map icon strings to actual React components
const iconMap: Record<string, JSX.Element> = {
    'FaCode': <FaCode className="text-4xl text-white" />,
    'FaCloud': <FaCloud className="text-4xl text-white" />,
    'FaShieldAlt': <FaShieldAlt className="text-4xl text-white" />,
    'FaChartLine': <FaChartLine className="text-4xl text-white" />,
    'FaLaptopCode': <FaLaptopCode className="text-4xl text-white" />,
    'FaMobileAlt': <FaMobileAlt className="text-4xl text-white" />,
    'FaTools': <FaTools className="text-4xl text-white" />
};

// Function to get icon component from string
const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || <FaTools className="text-4xl text-white" />;
};

// Fetch services from the database
async function getServices() {
    try {
        const services = await prisma.service.findMany({
            where: { active: true },
            orderBy: { title: 'asc' }
        });

        // Transform the data to include the icon component
        return services.map(service => ({
            ...service,
            icon: getIconComponent(service.icon),
            // Ensure color has a default if not set
            color: service.color || 'from-blue-500 to-blue-600'
        }));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export default async function ServicesPage() {
    // Fetch services from the database
    const services = await getServices();

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-primary-200 opacity-40 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
                            Our <span className="text-primary-600">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Comprehensive IT solutions designed to transform your business and drive growth in the digital age.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Detail Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">What We Offer</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our comprehensive range of IT services designed to meet your business needs and drive digital transformation.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {services.map((service) => (
                            <div key={service.id} id={service.id} className="scroll-mt-24">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className={`p-8 rounded-xl bg-gradient-to-br ${service.color} text-white`}>
                                        <div className="flex items-center mb-4">
                                            <div className="mr-4 bg-white/20 p-3 rounded-lg">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold">{service.title}</h3>
                                        </div>
                                        <p className="text-white/90 mb-6">{service.description}</p>
                                        <ul className="space-y-2">
                                            {service.details.map((detail, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mr-2 mt-1">•</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-8 rounded-xl">
                                        <h4 className="text-xl font-bold mb-4">Why Choose Our {service.title}?</h4>
                                        <p className="text-gray-600 mb-4">
                                            Our team of experienced professionals delivers high-quality solutions tailored to your specific business requirements.
                                        </p>
                                        <p className="text-gray-600 mb-4">
                                            We use the latest technologies and best practices to ensure that your projects are completed on time and within budget.
                                        </p>
                                        <div className="mt-6">
                                            <a href="/contact" className="btn-primary inline-block">
                                                Get Started
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
                        <p className="text-xl mb-8 text-white/90">
                            Contact us today to discuss how our IT services can help your business grow and succeed.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="/contact" className="btn-white">
                                Contact Us
                            </a>
                            <a href="/about" className="btn-outline-white">
                                Learn More About Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}