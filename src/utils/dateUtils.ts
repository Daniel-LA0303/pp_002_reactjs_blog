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

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 60) return "just now";

  if (seconds < intervals.hour) {
    const mins = Math.floor(seconds / intervals.minute);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }

  if (seconds < intervals.day) {
    const hours = Math.floor(seconds / intervals.hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (seconds < intervals.month) {
    const days = Math.floor(seconds / intervals.day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  if (seconds < intervals.year) {
    const months = Math.floor(seconds / intervals.month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(seconds / intervals.year);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
