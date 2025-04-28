'use client';

// This layout overrides the parent admin layout for the login page
// to prevent authentication checks from blocking the login UI
export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}