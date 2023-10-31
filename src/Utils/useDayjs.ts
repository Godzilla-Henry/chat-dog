import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn'; // import locale

dayjs.extend(duration);
dayjs.extend(isLeapYear); // use plugin
dayjs.locale('zh-cn'); // use locale

export const formatTime = (datetime: any) => {
  return dayjs(datetime).format('HH:mm');
};

export const diffTime = (datetime: any) => {
  return dayjs().diff(datetime, 'minute');
};
