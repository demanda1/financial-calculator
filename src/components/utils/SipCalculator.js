async function animateValue(id, duration, start, end){
    return new Promise((resolve, reject) => {
        let range = Math.abs(end-start);
        let obj = document.getElementById(id);
        let startTime = new Date().getTime();
        let endTime = startTime + duration;

        const timer = setInterval(()=>{
            let now = new Date().getTime();
            let remainingTime = Math.max((endTime-now)/duration, 0);
            let value = Math.round(Math.abs(end - range*remainingTime));
            obj.innerHTML = value;
            if(value === end || now >= endTime){
                console.log(id + " is done")
                clearInterval(timer);
                resolve();
            }
        }, 1);
    })
    
}


export default function CalculateSip(inputIds, outputIds){
    const per_month_amount = document.getElementById(inputIds[0]).value;
    const mf_rate = document.getElementById(inputIds[1]).value;
    const time_period = document.getElementById(inputIds[2]).value;
    const invValue = per_month_amount * time_period * 12 ;
    const calcRate = mf_rate/1200;
    const x = ((Math.pow(1+calcRate, time_period*12) - 1) /calcRate).toFixed(4);
    const totalValue = per_month_amount * x * (1 + calcRate);
    const estValue = totalValue - invValue;
     async function changeValues(){
        let invVal = document.getElementById(outputIds[0]).innerHTML;
        let estRet = document.getElementById(outputIds[1]).innerHTML;
        let totVal = document.getElementById(outputIds[2]).innerHTML;

        const promises = [animateValue(outputIds[0], 350, invVal, invValue), 
        animateValue(outputIds[1], 350, estRet, estValue), animateValue(outputIds[2], 350, totVal, totalValue)];
        await Promise.all(promises);
        console.log("All function calls completed");
        
    }
    changeValues();
}