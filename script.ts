const operations = "+-*/";

const { add, subtract, multipy, divide } = {
  add: (x: number, y: number): number => x + y,
  subtract: (x: number, y: number): number => x - y,
  multipy: (x: number, y: number): number => x * y,
  divide: (x: number, y: number): number => x / y,
} as const;

const num = [12, 2, 4, 12];
const opr = ["+", "-", "/"];

const oprMap = {
  "+" : add(num[0]!, num[1]!),
  "-" : subtract(num[0]!, num[1]!),
  "*" : multipy(num[0]!, num[1]!),
  "/" : divide(num[0]!, num[1]!),
}


for (let i = 0; i < opr.length; i++) {
  if (num[0] !== undefined && num[1] !== undefined && opr[i] !== undefined) {
    num.splice(0, 2, oprMap[opr[i] as keyof typeof oprMap]);
  }
}

console.log(num);


