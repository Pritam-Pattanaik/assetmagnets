/**
 * Rate limiter utility for tracking login attempts
 * Implements a simple in-memory store with IP and username tracking
 */

interface RateLimitRecord {
    attempts: number;
    lastAttempt: number;
    lockedUntil: number | null;
}

class RateLimiter {
    private store: Map<string, RateLimitRecord>;
    private readonly maxAttempts: number;
    private readonly lockoutDuration: number; // in milliseconds
    private readonly windowDuration: number; // in milliseconds

    constructor(maxAttempts = 10, lockoutDuration = 5 * 60 * 1000, windowDuration = 60 * 60 * 1000) {
        this.store = new Map();
        this.maxAttempts = maxAttempts; // Increased from 5 to 10 attempts
        this.lockoutDuration = lockoutDuration; // Reduced from 15 to 5 minutes
        this.windowDuration = windowDuration; // 1 hour by default

        // Clean up expired records periodically
        setInterval(() => this.cleanupExpiredRecords(), 10 * 60 * 1000); // every 10 minutes
    }

    /**
     * Check if a key (IP or username) is currently locked out
     */
    isLocked(key: string): { locked: boolean; remainingTime?: number } {
        const record = this.store.get(key);
        const now = Date.now();

        if (!record) {
            return { locked: false };
        }

        // If there's a lockout and it hasn't expired
        if (record.lockedUntil && record.lockedUntil > now) {
            return {
                locked: true,
                remainingTime: Math.ceil((record.lockedUntil - now) / 1000) // in seconds
            };
        }

        // Reset lockout if it has expired
        if (record.lockedUntil && record.lockedUntil <= now) {
            record.attempts = 0;
            record.lockedUntil = null;
            this.store.set(key, record);
            return { locked: false };
        }

        // Check if attempts have expired based on window duration
        if (now - record.lastAttempt > this.windowDuration) {
            record.attempts = 0;
            this.store.set(key, record);
        }

        return { locked: false };
    }

    /**
     * Record a failed login attempt
     */
    recordFailedAttempt(key: string): { locked: boolean; remainingTime?: number } {
        const now = Date.now();
        const record = this.store.get(key) || { attempts: 0, lastAttempt: now, lockedUntil: null };

        // If already locked, just return the status
        if (record.lockedUntil && record.lockedUntil > now) {
            return {
                locked: true,
                remainingTime: Math.ceil((record.lockedUntil - now) / 1000) // in seconds
            };
        }

        // Increment attempts and update last attempt time
        record.attempts += 1;
        record.lastAttempt = now;

        // Lock the account if max attempts reached
        if (record.attempts >= this.maxAttempts) {
            record.lockedUntil = now + this.lockoutDuration;
        }

        this.store.set(key, record);

        if (record.lockedUntil) {
            return {
                locked: true,
                remainingTime: Math.ceil((record.lockedUntil - now) / 1000) // in seconds
            };
        }

        return {
            locked: false,
            remainingTime: 0
        };
    }

    /**
     * Reset attempts for a key after successful login
     */
    resetAttempts(key: string): void {
        this.store.delete(key);
    }

    /**
     * Clean up expired records to prevent memory leaks
     */
    private cleanupExpiredRecords(): void {
        const now = Date.now();
        // Using Array.from to convert Map entries to array for compatibility with lower TypeScript targets
        Array.from(this.store.entries()).forEach(([key, record]) => {
            // Remove records that have expired lockouts or haven't had attempts in the window
            if (
                (record.lockedUntil && record.lockedUntil < now) ||
                (now - record.lastAttempt > this.windowDuration)
            ) {
                this.store.delete(key);
            }
        })
    }
}

// Export a singleton instance
export const rateLimiter = new RateLimiter();