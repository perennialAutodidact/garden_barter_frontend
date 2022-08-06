import dayjs, {Dayjs} from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/** 
 * Returns the date string as a human-readable distance from the current date
 * @param date - date string */
 export const humanizeDateDistance = (date: string): string => {
    let _date: Dayjs = dayjs(date);
    date = _date.from(dayjs());
    return date;
  };
  