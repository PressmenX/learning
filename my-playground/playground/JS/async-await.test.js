console.log(1);
(async () => {
  console.log(2);
  await console.log(3);
  console.log(4);
})()
console.log(5);