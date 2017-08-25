function convertToReadableDate(date) {
    var dt = new Date(date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var formattedDate = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear() + ' ' + dt.getHours() + ':' + dt.getMinutes()
    return formattedDate;
}