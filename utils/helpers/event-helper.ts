export function isParticipated(currentUserRollNumber: string, event: any) {
    const participants = event?.participants;
    return (participants as any[]).findIndex((participant) => participant.rollnumber === currentUserRollNumber) >= 0;
}

export const stripHtmlTags = (htmlString: string) => {
    // Remove HTML tags using a regular expression
    return htmlString.replace(/<[^>]*>?/gm, '');
};
