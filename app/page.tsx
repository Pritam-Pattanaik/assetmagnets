import Image from 'next/image';
import Link from 'next/link';
import { animations } from '@/utils/animations';
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection';
import { EnhancedServicesHighlight } from '@/components/home/EnhancedServicesHighlight';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { CtaSection } from '@/components/home/CtaSection';
import { StatsSection } from '@/components/home/StatsSection';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <EnhancedHeroSection />

      {/* Services Highlight Section */}
      {/* Using EnhancedServicesHighlight instead of the fixed ServicesHighlight */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive IT solutions tailored to meet your business needs.</p>
          </div>
          <EnhancedServicesHighlight />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hear from businesses that have transformed their operations with our IT services.</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}