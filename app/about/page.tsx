import { CompanyTimeline } from '@/components/about/CompanyTimeline';
import { TeamProfiles } from '@/components/about/TeamProfiles';
import { CoreValues } from '@/components/about/CoreValues';

export const metadata = {
  title: 'About Us | ASSET-MAGNETS',
  description: 'Learn about ASSET-MAGNETS, our history, our team, and our core values that drive our IT solutions and services.',
};

export default function AboutPage() {
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
              About <span className="text-primary-600">ASSET-MAGNETS</span>
            </h1>
            <p className="text-xl text-gray-600">
              We're a team of passionate IT professionals dedicated to transforming businesses through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From our humble beginnings to becoming a leading IT solutions provider, explore the key milestones in our company's history.
            </p>
          </div>
          <CompanyTimeline />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we deliver value to our clients.
            </p>
          </div>
          <CoreValues />
        </div>
      </section>

      {/* Team Profiles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together years of experience and a passion for technology.
            </p>
          </div>
          <TeamProfiles />
        </div>
      </section>

    </main>
  );
}