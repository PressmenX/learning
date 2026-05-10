
process.on("uncaughtException", (err)=> console.log(`Terdeteksi Error: ${err.message}`) )
process.on("unhandledRejection", (reason, promise)=> console.log(`Error Promise : ${reason} - ${promise}`))

const readData = () => {
  console.log(10/angkaGaib);
}

const reject = () => new Promise((_,reject) => reject("Data ditolak"))

reject()
console.log("Selesai");