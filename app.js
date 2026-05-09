const { exec } = require('child_process')
const os = require('os')

const usedRam = Math.floor((os.totalmem() - os.freemem()) / os.totalmem() * 100)
const platform = os.platform()
const arch = os.arch()

exec('ping google.com -c 3', (error, stdout, stderr) => {
    if (error) return console.log(error.message);
    console.log(`Platform : ${platform} \nUsed RAM : ${usedRam}% \nPING Google : ${stdout}`);
    setImmediate(()=> console.log("Audit Completed"))
})

