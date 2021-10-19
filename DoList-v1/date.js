function getDate(){
    const today = new Date();
    let currentDay = today.getDay();
    var arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const options= {
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    return today.toLocaleDateString("en-US",options);
}
// declare function as variable
var getDay= function(){
    const today = new Date();
    const options= {
        weekday:"long",
    }
    return today.toLocaleDateString("en-US",options);
    
}
// direct export and shortcut of module.exports
exports.getMonth = function(){
    const today = new Date();
    const options= {
        month:"long"
    }
    return today.toLocaleDateString("en-US",options);
}
module.exports.getDate = getDate;
module.exports.getDay = getDay;