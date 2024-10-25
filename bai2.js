function isPrime(n){
    if(n < 2){
        return false;
    }
    for(let i = 2; i <= Math.sqrt(n); i++){
        if(n%i == 0){
            return false;
        }
    }
    return true;
}

function total(arr){
    let total = 0;
    arr.forEach(element => {
        total += element;
    });
    return total;
}

function devideThree(arr){
    const result = arr.filter((item) => item%3 == 0);
    return result;
}

var mang = new Array(10, 5, 2, 5, 6, 7, 8, 9);

setTimeout(() => {
    const totalArr = total(mang);
    console.log(totalArr);
}, 3000);

setTimeout(() => {
    mang.forEach((item) => {
        isPrime(item) ? console.log(item + " là số nguyên tố"): console.log(item + " không phải số nguyên tố");
    });
}, 3000);

setTimeout(() => {
    const arr = devideThree(mang);
    console.log("Các số chia hết cho 3: ")
    arr.forEach((item) => {
        console.log(item);
    })
}, 3000);
