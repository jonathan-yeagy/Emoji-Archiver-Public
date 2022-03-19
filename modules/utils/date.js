module.exports = date = () => {
    let today = new Date;
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if(month < 10){month = "0" + month;}
    let day = today.getDate();
    if(day < 10){day = "0" + day;}
    return year.toString() + month.toString() + day.toString();
};