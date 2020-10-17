// Run calcTime every second
let updateEndCountdown = (date, i) => {
    const weekday =["Mon","Tue","Wed","Thur","Fri","Sat","Sun"];
    let newdate = new Date(date);
    let now = new Date().getTime();
    let end = new Date(date).getTime();
    let timeleft = now - end;
    let day = new Date(date).getDay();
    let hour = new Date(date).getHours();
    let ampm = hour >= 12 ? 'pm' : 'am';
    hour > 12 ? hour = hour -12: hour = hour;


    // Calculating the days, hours, minutes and seconds left
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    
    let countdown="";
    // Display the message when countdown is over
    if (timeleft < 0) {
        countdown = "TIME UP!!";
    }else{
        if(days < 1){
            countdown = hours+":"+ minutes+":"+ seconds;
        }else if(days <= 6){
            countdown = weekday[day-1]+" "+hour+ampm;
        }else{
            countdown = newdate.getMonth()+1+"/"+newdate.getDate()+" "+hour+ampm;


        }
    }; 

    let elementID="countdown"+i;
    document.getElementById(elementID).innerHTML = countdown;    
};

export default updateEndCountdown;