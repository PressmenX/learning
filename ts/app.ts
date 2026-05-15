console.log("---------- Main Service Start ----------");
setTimeout(()=> console.log("installing tools..."),500)
setTimeout(()=> console.log("installing package..."),1000)
setTimeout(()=> console.log("processing tools..."),1500)
setTimeout(()=> console.log("processing package..."),2000)
setTimeout(() => process.exit(1), 3000);