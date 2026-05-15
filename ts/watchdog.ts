import { spawn } from "node:child_process";

function monitorService(): void {
  const child = spawn("ts-node", ["ts/app.ts"], { stdio: "inherit" });

  child.on("exit", (code) => {
    console.log(
      `[WATCHDOG] Service is exit with code ${code}, Tried restarting the service...`,
    );
    setTimeout(() => monitorService(), 1000);
  });
}

monitorService()