function isPerfectNumber(n){
    let total = 0;
    for(let i = 1; i <= n/2; i++){
        if(n%i == 0){
            total += i;
        }
    }
    if(total == n){
        return true;
    }
    return false;
}

setInterval(() => {
    const randomNumber = Math.floor(Math.random()*100);
    console.log("Số random là: " + randomNumber);
    if(isPerfectNumber(randomNumber)){
        console.log(randomNumber + "là số hoàn hảo");
    }else{
        console.log(randomNumber + " không phải số hoàn hảo");
    }
}, 2000);


