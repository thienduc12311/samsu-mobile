
import { DateTime } from 'luxon';
// Helper function to convert a number to a string with leading zero if needed
export function padNumber(num: any) {
    return num.toString().padStart(2, '0')
}
export function hasTimestampPassed(timestamp: any): boolean {
    const currentDateTime = DateTime.now();
    const targetDateTime = DateTime.fromMillis(timestamp);
    return targetDateTime <= currentDateTime;
}

// Function to convert datePost to "time ago" format
export function getTimeAgo(datePost: any) {
    const currentDate = new Date()
    const postDate = new Date(datePost)

    // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    const seconds = Math.floor((currentDate - postDate) / 1000)
    if (seconds < 60) {
        return `${seconds} seconds ago`
    }

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
        return `${minutes} minutes ago`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
        return `${hours} hours ago`
    }

    const days = Math.floor(hours / 24)
    if (days < 30) {
        return `${days} days ago`
    }

    const months = Math.floor(days / 30)
    if (months < 12) {
        return `${months} months ago`
    }

    const years = Math.floor(months / 12)
    return `${years} years ago`
}
