function getDateFormat(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' : null}${month}-${day < 10 ? '0' : null}${day}`
}

module.exports = getDateFormat