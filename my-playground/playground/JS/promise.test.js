console.log(1);
new Promise((res) => {
  console.log(2);
  setTimeout(() => {
    console.log(3);
    res(4);
  }, 0);
}).then((d) => console.log(d));
console.log(5);
