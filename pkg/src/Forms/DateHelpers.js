import m from 'moment'

export function flattenDate(date) {
    return date;
};

export function addTimeToDate(date, datetime, ignoreDate) {
    /*
     if the ignoreDate flag is passed in as true, it will set the binding date for the time to be 1900.
     Being 1900 has it not show in the view, this is important in cases where we want to distinguish between
     setting just a date ... or setting just a time.
     Otherwise, the date will be set to the current date when the time is set.
     */
    if(!date && !datetime) {
        return null;
    } else {
        var m_dateTime = m(datetime);
        var m_date = m(date ? date : (ignoreDate || !datetime ? new Date(1900, 0, 1) : new Date()));
        m_date.hours(m_dateTime.hours());
        m_date.minutes(m_dateTime.minutes());
        return m_date.toDate();
    }
};

export function mergeDates(date, datewithtime) {
    var m_date = m(date);
    if(datewithtime) {
        var m_dateTime = m(datewithtime);
        m_date.hour(m_dateTime.format('HH'));
        m_date.minute(m_dateTime.format('mm'));
        return m_date.toDate();
    } else {
        m_date.hour(0);
        m_date.minute(0);
        m_date.seconds(0);
        // need to blank out the hours and minutes
        return m_date.toDate();
    }
};
