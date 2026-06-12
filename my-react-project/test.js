// @ts-check

/**
 * Komponen untuk menampilkan sisa saldo
 * @param {{ amount: number, currency: string }} props
 */
function Wallet({ amount, currency }) {
  return [currency, amount.toLocaleString()]
}

console.log(Wallet({amount : "0", currency : "ID"}));