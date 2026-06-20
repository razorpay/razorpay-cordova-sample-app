import type { DatetimeParts } from '../datetime-interface';
/**
 * Use to convert a string of comma separated numbers or
 * an array of numbers, and clean up any user input
 */
export declare const convertToArrayOfNumbers: (input?: string | number | number[] | undefined) => number[] | undefined;
/**
 * Extracts date information
 * from a .calendar-day element
 * into DatetimeParts.
 */
export declare const getPartsFromCalendarDay: (el: HTMLElement) => DatetimeParts;
/**
 * Given an ISO-8601 string, format out the parts
 * We do not use the JS Date object here because
 * it adjusts the date for the current timezone.
 */
export declare const parseDate: (val: string | undefined | null) => any | undefined;
export declare const clampDate: (dateParts: DatetimeParts, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined) => DatetimeParts;
