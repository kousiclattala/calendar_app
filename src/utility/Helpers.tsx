import dayjs from 'dayjs';

export const SUBJECTS = [
  'MATH',
  'PHYSICS',
  'ENG',
  'HINDI',
  'Break',
  'Dance',
  'MUSIC',
  'EVS',
  'PE',
];

export const SUBJECT_TYPES = ['Audio', 'Video', 'Break'];

export const getDifferenceofDays = (day: string) => {
  switch (day) {
    case 'Sunday':
      return 7;
    case 'Monday':
      return 0;
    case 'Tuesday':
      return 1;
    case 'Wednesday':
      return 2;
    case 'Thursday':
      return 3;
    case 'Friday':
      return 4;
    case 'Saturday':
      return 5;
    default:
      return 0;
  }
};

export const _getWeekDates = (date: string | number | Date) => {
  let arr = Array(7).fill(0);

  let weeks: {
    id: number;
    date: string;
    isSelected: boolean;
    timeTable: [];
  }[] = [];

  const curr_date = dayjs(date);

  let start_date = dayjs(date).set(
    'date',
    curr_date.date() - getDifferenceofDays(dayjs(curr_date).format('dddd')),
  );

  arr.forEach((item: any, index: number) => {
    let obj: any = {};

    let dt = dayjs(start_date).set('date', start_date.date() + (index + 1));
    let isMonday = dt.format('dddd') == 'Monday' ? true : false;

    Object.assign(obj, {
      id: index + 1,
      date: dt,
      isSelected: isMonday,
      timeTable: [],
    });

    weeks.push(obj);
  });

  return weeks;
};

export const _getPrevWeek = (date: string | number | Date) => {
  let arr = Array(7).fill(0);

  let weeks: {
    id: number;
    date: string;
    isSelected: boolean;
    timeTable: [];
  }[] = [];

  const curr_date = dayjs(date);

  let start_date = dayjs(date).set('date', curr_date.date() - 8);

  arr.forEach((item: any, index: number) => {
    let obj: any = {};
    let dt = dayjs(start_date).set('date', start_date.date() + (index + 1));
    let isMonday = dt.format('dddd') == 'Monday' ? true : false;

    Object.assign(obj, {
      id: index + 1,
      date: dt,
      isSelected: isMonday,
      timeTable: [],
    });

    weeks.push(obj);
  });

  return weeks;
};

export const _getNextWeek = (date: string | number | Date) => {
  let arr = Array(7).fill(0);

  let weeks: {
    id: number;
    date: string;
    isSelected: boolean;
    timeTable: [];
  }[] = [];

  const curr_date = dayjs(date);

  let start_date = dayjs(date).set('date', curr_date.date());

  arr.forEach((item: any, index: number) => {
    let obj: any = {};
    let dt = dayjs(start_date).set('date', start_date.date() + (index + 1));
    let isMonday = dt.format('dddd') == 'Monday' ? true : false;

    Object.assign(obj, {
      id: index + 1,
      date: dt,
      isSelected: isMonday,
      timeTable: [],
    });

    weeks.push(obj);
  });

  return weeks;
};

export const getRandomSubject = () => {
  const randomIndex = Math.floor(Math.random() * SUBJECTS.length);
  return SUBJECTS[randomIndex];
};

export const getRandomSubjectType = () => {
  const randomIndex = Math.floor(Math.random() * SUBJECT_TYPES.length);
  return SUBJECT_TYPES[randomIndex];
};

export const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 255);
  return randomNumber;
};

export const getTimeTable = () => {
  let _arr = Array(7).fill(0);
  let _timeTable: any = [];

  _arr.forEach((item: any, index: number) => {
    let obj: {} = {};

    Object.assign(obj, {
      id: index + 1,
      subject: getRandomSubject(),
      subjectType: getRandomSubjectType(),
      start_time: '09:00',
      end_time: '10:00',
    });

    _timeTable.push(obj);
  });

  return _timeTable;
};
