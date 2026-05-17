import { createHash } from "node:crypto";

interface Transaction {
  id: string;
  amount: number;
  sender: string;
  prevHash: string;
  hash: string;
}

const ledger: Transaction[] = [];

function calcHash(obj: Omit<Transaction, "hash">) {
  const { id, amount, sender, prevHash } = obj;
  const raw = id + amount + sender + prevHash;
  const hashed = createHash("sha256").update(raw).digest("hex");
  return hashed;
}

function addTransaction(amount: number, sender: string): void {
  const last = ledger.at(-1);
  const prevHash: string = last ? last.hash : "0000";

  const entry: Omit<Transaction, "hash"> = {
    id: crypto.randomUUID(),
    amount,
    sender,
    prevHash,
  };
  const hash = calcHash(entry);

  ledger.push({ ...entry, hash });
}

function validateChain() {
  let isValid = true
  for (let i = 0; i < ledger.length; i++) {
    const { id, amount, sender, prevHash, hash } = ledger[i]!;
    const entry = { id, amount, sender, prevHash };
    const currHash = calcHash(entry);

    if (currHash !== hash) {
      console.log(
        `[CRITICAL] Data Tampering Detected at Index: ${i} (Internal data changed)`,
      );
      isValid = false
      break;
    }

    if (i > 0 && prevHash !== ledger[i - 1]?.hash) {
      console.log(
        `[CRITICAL] Data Tampering Detected at Index: ${i} (Broken chain from previous transaction)`,
      );
      isValid = false
      break;
    }
  }

  if (isValid) console.log("[VALID] All data is valid");
}

addTransaction(1000, "Budi");
addTransaction(5000, "Udin");
addTransaction(10000, "Santi");
addTransaction(2000, "Yanto");

validateChain();
console.log("Validation 1 Complete \n");

ledger[1]!.hash = "A1929101";
validateChain();
console.log("Validation 2 Complete \n");

ledger[1]!.hash = ledger[2]!.prevHash;
ledger.splice(2, 1);
validateChain();
console.log("Validation 3 Complete \n");
