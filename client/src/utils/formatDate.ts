export function formateDate(dateString: string): string {
    return new Date(dateString).toLocaleString("fr-FR",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}