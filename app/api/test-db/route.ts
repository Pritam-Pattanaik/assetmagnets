import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Create a SQL query using the neon client
        const sql = neon(process.env.DATABASE_URL!);

        // Test the connection with a simple query
        const result = await sql`SELECT version()`;

        // Return the PostgreSQL version information
        return NextResponse.json({
            success: true,
            message: 'Database connection successful!',
            version: result[0].version
        });
    } catch (error: any) {
        // Return error information if connection fails
        return NextResponse.json({
            success: false,
            message: 'Database connection failed',
            error: error.message
        }, { status: 500 });
    }
}