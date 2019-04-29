import {SliceDate} from "./SliceDate";
declare var moment:any;

export const getHourDate = (dayString, hourString) => {
  let dayMoment = moment(dayString, "DD MMM YYYY 00:00:00");
  let hourMoment = moment(hourString, "DD MMM YYYY hh:00:00 A");
  
  dayMoment.set('hour', hourMoment.get('hour'));

  let startDate = dayMoment.clone().toDate();
  let endDate = dayMoment.endOf('hour').clone().toDate();

  return {
    start: startDate,
    end: endDate,
    title: moment(startDate).format('hh:00 A'),
    diff: 1,
    frequency: 'hour',
    sliceDate: [new SliceDate(moment(startDate).format('hh:00 A'), startDate, endDate)]
  }
};


export const getHourRangeDate =  (startDayString, startHourString, endDayString, endHourString) => {
  let startDayMoment = moment(startDayString, "DD MMM YYYY 00:00:00");
  let startHourMoment = moment(startHourString, "DD MMM YYYY HH:00:00 A");
  startDayMoment.set('hour', startHourMoment.get('hour'));

  let endDayMoment = moment(endDayString, "DD MMM YYYY 00:00:00");
  let endHourMoment = moment(endHourString, "DD MMM YYYY HH:00:00 A");
  endDayMoment = endDayMoment.set('hour', endHourMoment.get('hour')).endOf('hour');

  var diff = endDayMoment.diff(startDayMoment,'hours') + 1;//Inclusive of the end
  console.log(diff);

  let sliceDate = [];
  let tempDate = startDayMoment.clone();

  for(var i=0; i<diff; i++){
    sliceDate.push(new SliceDate(tempDate.format('hh A'), tempDate.startOf('hour').clone().toDate(), tempDate.endOf('hour').clone().toDate()));
    tempDate.add(1, 'hour')
  }

  return {
    start: startDayMoment.clone().toDate(),
    end: endDayMoment.clone().toDate(),
    diff: diff,
    frequency: 'hour',
    sliceDate: sliceDate,
  }
};


export const getDayDate = (dayString) => {
  let dayMoment = moment(dayString, "DD MMM YYYY 00:00:00");

  let startDate = dayMoment.startOf('day').clone().toDate();
  let endDate = dayMoment.endOf('day').clone().toDate();

  return {
    start: startDate,
    end: endDate,
    title: moment(startDate).format('Do MMM YYYY'),
    diff: 1,
    frequency: 'day',
    sliceDate: [new SliceDate(moment(startDate).format('Do MMM'), startDate, endDate)]
  }
};


export const getTodayDate = () => {
  let dayMoment = moment().startOf('day');

  let startDate = dayMoment.clone().toDate();
  let endDate = dayMoment.endOf('day').clone().toDate();

  return {
    start: startDate,
    end: endDate,
    title: moment(startDate).format('Do MMM YYYY'),
    diff: 1,
    frequency: 'day',
    sliceDate: [new SliceDate(moment(startDate).format('Do MMM YYYY'), startDate, endDate)]
  }
};


export const getDayRangeDate = (startDayString, endDayString) => {
  let startDayMoment = moment(startDayString, "DD MMM YYYY 00:00:00");
  let endDayMoment = moment(endDayString, "DD MMM YYYY 00:00:00").endOf('day');

  var diff = endDayMoment.diff(startDayMoment,'days') + 1;//Inclusive of the end
  let sliceDate = [];

  let tempDate = startDayMoment.clone();

  for(var i=0; i<diff; i++){
    sliceDate.push(new SliceDate(tempDate.format('Do MMM'), tempDate.startOf('day').startOf('hour').clone().toDate(), tempDate.endOf('day').endOf('hour').clone().toDate()));
    tempDate.add(1, 'day')
  }

  return {
    start: startDayMoment.clone().toDate(),
    end: endDayMoment.clone().toDate(),
    diff: diff,
    frequency: 'day',
    sliceDate: sliceDate
  }
};



export const getMonthDate = (monthString, yearString) => {

  let dayMoment = moment();
  dayMoment.set('month', monthString);
  dayMoment.set('year', yearString);
  dayMoment = dayMoment.startOf('month').startOf('day').startOf('hour');

  let startDate = dayMoment.clone().toDate();
  let endDate = dayMoment.endOf('month').endOf('day').endOf('hour').clone().toDate();

  return {
    start: startDate,
    end: endDate,
    title: dayMoment.format('MMM YYYY'),
    diff: 1,
    frequency: 'month',
    sliceDate: [new SliceDate(dayMoment.format('MMM YYYY'), startDate, endDate)]
  }
};


export const getMonthRangeDate = (startMonth, startYear, endMonth, endYear) => {

  let startMoment = moment();
  startMoment.set('year', startYear);
  startMoment.set('month', startMonth);
  startMoment = startMoment.startOf('month').startOf('day').startOf('hour');

  let endMoment = moment();
  endMoment.set('year', endYear);
  endMoment.set('month', endMonth);
  endMoment = endMoment.endOf('month').endOf('day').endOf('hour');

  var diff = endMoment.diff(startMoment,'month') + 1;//Inclusive of the end
  let sliceDate:SliceDate[] = [];

  let tempDate = startMoment.clone();

  for(var i=0; i<diff; i++){
    sliceDate.push(new SliceDate(tempDate.format('MMM YYYY'), tempDate.startOf('month').startOf('day').startOf('hour').clone().toDate(), tempDate.endOf('month').endOf('day').endOf('hour').clone().toDate()));
    tempDate.add(1, 'month')
  }

  return {
    start: startMoment.clone().toDate(),
    end: endMoment.clone().toDate(),
    diff: diff,
    frequency: 'month',
    sliceDate: sliceDate
  }
};



export const getYearDate = (yearString) => {
  let dayMoment = moment();
  dayMoment.set('year', yearString);
  dayMoment = dayMoment.startOf('year').startOf('month').startOf('day').startOf('hour');

  let startDate = dayMoment.clone().toDate();
  let endDate = dayMoment.endOf('year').endOf('month').endOf('day').endOf('hour').clone().toDate();

  return {
    start: startDate,
    end: endDate,
    title: dayMoment.format('YYYY'),
    diff: 1,
    frequency: 'month',
    sliceDate: [new SliceDate(dayMoment.format('YYYY'), startDate, endDate)]
  }
};


export const getYearRangeDate = (startYear, endYear) => {
  let startMoment = moment();
  startMoment.set('year', startYear);
  startMoment = startMoment.startOf('year').startOf('month').startOf('day').startOf('hour');

  let endMoment = moment();
  endMoment.set('year', endYear);
  endMoment = endMoment.endOf('year').endOf('month').endOf('day').endOf('hour');

  var diff = endMoment.diff(startMoment,'year') + 1;//Inclusive of the end
  let sliceDate = [];

  let tempDate = startMoment.clone();

  for(var i=0; i<diff; i++){
    sliceDate.push(new SliceDate(tempDate.format('YYYY'), tempDate.startOf('year').startOf('month').startOf('day').startOf('hour').clone().toDate(), tempDate.endOf('year').endOf('month').endOf('day').endOf('hour').clone().toDate()));
    tempDate.add(1, 'year')
  }

  return {
    start: startMoment.clone().toDate(),
    end: endMoment.clone().toDate(),
    diff: diff,
    frequency: 'year',
    sliceDate: sliceDate
  }
};
