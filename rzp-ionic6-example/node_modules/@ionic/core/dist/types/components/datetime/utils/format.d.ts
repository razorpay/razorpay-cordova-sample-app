import type { DatetimeParts } from '../datetime-interface';
export declare const getFormattedTime: (refParts: DatetimeParts, use24Hour: boolean) => string;
/**
 * Adds padding to a time value so
 * that it is always 2 digits.
 */
export declare const addTimePadding: (value: number) => string;
/**
 * Formats the hour value so that it
 * is always 2 digits. Only applies
 * if using 12 hour format.
 */
export declare const getFormattedHour: (hour: number, use24Hour: boolean) => string;
/**
 * Generates an aria-label to be read by screen readers
 * given a local, a date, and whether or not that date is
 * today's date.
 */
export declare const generateDayAriaLabel: (locale: string, today: boolean, refParts: DatetimeParts) => string | null;
/**
 * Gets the day of the week, month, and day
 * Used for the header in MD mode.
 */
export declare const getMonthAndDay: (locale: string, refParts: DatetimeParts) => string;
/**
 * Given a locale and a date object,
 * return a formatted string that includes
 * the month name and full year.
 * Example: May 2021
 */
export declare const getMonthAndYear: (locale: string, refParts: DatetimeParts) => string;
