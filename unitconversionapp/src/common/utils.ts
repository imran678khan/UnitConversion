// Format currency
export const formatCurrency = (value: number) => {
    return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
}

// Format weekday, day month
export const formatLongDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    return date.toLocaleDateString('en-AU', options);
}

// Format yyyy-mm-dd
export const formatShortDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    const formattedDate = date.toLocaleDateString('en-AU', options);
    const [day, month, year] = formattedDate.split('/');

    return `${year}-${month}-${day}`;
}

// Format dd/mm/yyyy
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-AU');
}

// Datatable scrollable - only enable for datatable when not stacked.
export const scrollable: boolean = window.innerWidth > 960;

export const fromStoreApp = (): string | null => {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const storeNo = searchParams.get("storeNo");

    return storeNo;
}