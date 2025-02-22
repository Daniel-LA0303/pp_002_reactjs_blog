export function formatDate(dateString: string): string {

    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    
    };

    return date.toLocaleString('en-US', options);
}

export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Usa formato de 24 horas, cambia a true para AM/PM
    };

    return date.toLocaleString('en-US', options).replace(',', '');
}
