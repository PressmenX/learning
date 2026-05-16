import { spawn } from "node:child_process";

const maxRestart = 5
let currRestart = 0 
function monitorService(): void {
  const child = spawn("ts-node", ["ts/app.ts"], { stdio: "inherit" });

  child.on("exit", (code) => {
    currRestart++
    console.log(
      `[WATCHDOG] Service is exit with code ${code}, Tried restarting the service... (×${currRestart})`,
    );

    if (currRestart >= maxRestart) {
      console.log("Automated restart limit reached. Action required: Please run the restart command");
      return
    }
    setTimeout(() => {
      monitorService()
    }, 1000);
  });
}

monitorService()