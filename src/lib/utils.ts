export const formatDateFromISOFormat = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "UTC",
    }).format(date);
}
