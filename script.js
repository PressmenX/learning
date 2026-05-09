const log1 =  () => {
    console.log("1");
     new Promise(res => setTimeout(() => {
        console.log("2");
        res()
    }, 0))
    console.log("3");
}
const log2 = async  () => {
    console.log("1");
     await new Promise(res => setTimeout(() => {
        console.log("2");
        res()
    }, 0))
    console.log("3");
}

log2()