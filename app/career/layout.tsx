import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers | ASSET-MAGNETS',
    description: 'Join our team at ASSET-MAGNETS. Explore career opportunities in IT, software development, cloud solutions, and more.',
};

export default function CareerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}