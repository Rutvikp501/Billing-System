"use strict";
const dayjs = require("dayjs");

function getcurrentdateandtime() {
    var currentDateTime = new Date();
    // Get day, month, and year
    var day = currentDateTime.getDate();
    var month = currentDateTime.getMonth() + 1; // Months are zero-based
    var year = currentDateTime.getFullYear();
    // Get hours, minutes, and seconds
    var hours = currentDateTime.getHours();
    var minutes = currentDateTime.getMinutes();
    var seconds = currentDateTime.getSeconds();
    // Determine AM or PM
    var amOrPm = hours >= 12 ? 'PM' : 'AM';
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    // Format the date and time as dd/mm/yyyy hh:mm:ss am/pm
    let formattedDateTime =
        day.toString().padStart(2, '0') + '-' +
        month.toString().padStart(2, '0') + '-' +
        year + ' ' +
        hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ' ' +
        amOrPm;
    var date= formatDate1(formattedDateTime)
    return date;
}

function getdateyyyymmdd() {
    let x = new Date();
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    let yyyymmdd = y + m + d;
    return yyyymmdd
}



module.exports = {
    getcurrentdateandtime: getcurrentdateandtime,
    getdateyyyymmdd:getdateyyyymmdd
};