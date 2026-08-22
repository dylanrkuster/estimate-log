export const MINUTES_MAX = 10080;
export const REASONING_MAX = 2000;

export function calendarDate(date: Date) {
    return date.toISOString().slice(0, 10);
}
