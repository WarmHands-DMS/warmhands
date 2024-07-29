import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const DaysAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const currentTimeZone = moment.tz.guess();
    const now = moment().tz(currentTimeZone);
    const givenDate = moment(date).tz(currentTimeZone);

    const secondsDiff = now.diff(givenDate, 'seconds');
    const minutesDiff = now.diff(givenDate, 'minutes');
    const hoursDiff = now.diff(givenDate, 'hours');
    const daysDiff = now.diff(givenDate, 'days');
    const monthsDiff = now.diff(givenDate, 'months');

    let timeAgoText;
    if (secondsDiff < 60) {
      timeAgoText = `${secondsDiff} seconds ago`;
    } else if (minutesDiff < 60) {
      timeAgoText = `${minutesDiff} minutes ago`;
    } else if (hoursDiff < 24) {
      timeAgoText = `${hoursDiff} hours ago`;
    } else if (daysDiff < 30) {
      timeAgoText = `${daysDiff} days ago`;
    } else {
      timeAgoText = `${monthsDiff} months ago`;
    }

    setTimeAgo(timeAgoText);
  }, [date]);

  return <div>{timeAgo}</div>;
};

export default DaysAgo;
