import type { DatetimeParts } from '../datetime-interface';
export declare const isYearDisabled: (refYear: number, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined) => boolean;
/**
 * Returns true if a given day should
 * not be interactive according to its value,
 * or the max/min dates.
 */
export declare const isDayDisabled: (refParts: DatetimeParts, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined, dayValues?: number[] | undefined) => boolean;
/**
 * Given a locale, a date, the selected date, and today's date,
 * generate the state for a given calendar day button.
 */
export declare const getCalendarDayState: (locale: string, refParts: DatetimeParts, activeParts: DatetimeParts, todayParts: DatetimeParts, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined, dayValues?: number[] | undefined) => {
  disabled: boolean;
  isActive: boolean;
  isToday: boolean;
  ariaSelected: string | null;
  ariaLabel: string | null;
};
/**
 * Returns `true` if the month is disabled given the
 * current date value and min/max date constraints.
 */
export declare const isMonthDisabled: (refParts: DatetimeParts, { minParts, maxParts, }: {
  minParts?: DatetimeParts | undefined;
  maxParts?: DatetimeParts | undefined;
}) => boolean;
/**
 * Given a working date, an optional minimum date range,
 * and an optional maximum date range; determine if the
 * previous navigation button is disabled.
 */
export declare const isPrevMonthDisabled: (refParts: DatetimeParts, minParts?: DatetimeParts | undefined, maxParts?: DatetimeParts | undefined) => boolean;
/**
 * Given a working date and a maximum date range,
 * determine if the next navigation button is disabled.
 */
export declare const isNextMonthDisabled: (refParts: DatetimeParts, maxParts?: DatetimeParts | undefined) => boolean;
