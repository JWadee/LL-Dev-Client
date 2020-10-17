//Function to check if handicap is number or string like "0.0, -0.5"
let formatHandicap = (handicap) => {
    if(isNaN(handicap)){
        let nums = handicap.split(",");
        let total = (parseFloat(nums[0])+parseFloat(nums[1]));
        let formatted = total / 2;
        return(formatted);
    }else{
        return(handicap);
    }
};

export default formatHandicap;