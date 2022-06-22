import type { Mode } from '../../../interface';
import type { DatetimeParts } from '../datetime-interface';
/**
 * Returns the current date as
 * an ISO string in the user's
 * time zone.
 */
export declare const getToday: () => string;
/**
 * Given a locale and a mode,
 * return an array with formatted days
 * of the week. iOS should display days
 * such as "Mon" or "Tue".
 * MD should display days such as "M"
 * or "T".
 */
export declare const getDaysOfWeek: (locale: string, mode: Mode, firstDayOfWeek?: number) => string[];
/**
 * Returns an array containing all of the
 * days in a month for a given year. Values are
 * aligned with a week calendar starting on
 * the firstDayOfWeek value (Sunday by default)
 * using null values.
 */
export declare const getDaysOfMonth: (month: number, year: number, firstDayOfWeek: number) => ({
  day: number;
  dayOfWeek: number;
} | {
  day: null;
  dayOfWeek: null;
})[];
/**
 * Given a local, reference datetime parts and option
 * max/min bound datetime parts, calculate the acceptable
 * hour and minute values according to the bounds and locale.
 */
export declare const generateTime: (refParts: DatetimeParts, hourCycle?: 'h12' | 'h23', minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined, hourValues?: number[] | undefined, minuteValues?: number[] | undefined) => {
  hours: number[];
  minutes: number[];
  am: boolean;
  pm: boolean;
};
/**
 * Given DatetimeParts, generate the previous,
 * current, and and next months.
 */
export declare const generateMonths: (refParts: DatetimeParts) => DatetimeParts[];
export declare const getPickerMonths: (locale: string, refParts: DatetimeParts, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined, monthValues?: number[] | undefined) => {
  text: string;
  value: number;
}[];
export declare const getCalendarYears: (refParts: DatetimeParts, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined, yearValues?: number[] | undefined) => number[];
