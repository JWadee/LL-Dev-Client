//function to format from epoch time
const formatTime = (time) => {
    let dtm = parseInt(time)
    let adjusted = new Date(dtm *1000);
    let formattedTime = adjusted.toLocaleString([], {dateStyle: 'short', timeStyle:'short'});  
    return(formattedTime);  
}

export default formatTime;