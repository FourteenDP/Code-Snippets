const p1 = new Promise((resolve, reject) => {
  console.log('1');
  resolve(0);
})
  .then(() => {
    console.log('6');
    return new Promise((resolve, reject) => {
      console.log('7');
      resolve(0);
    })
      .then(() => {
        console.log('9');
      })
      .then(() => {
        console.log('11');
      });
  })
  .then(() => {
    console.log('10');
  });

console.log('2');

setTimeout(function () {
  console.log('12');
  process.nextTick(function () {
    console.log('14');
  })
  new Promise(function (resolve) {
    console.log('13');
    resolve(0);
  }).then(function () {
    console.log('15')
  })
})

new Promise(function (resolve) {
  console.log('3');
  resolve(0);
}).then(function () {
  console.log('8')
})
process.nextTick(function () {
  console.log('4');

  process.nextTick(function () {
    console.log('5');
  })
})

setTimeout(function () {
  console.log('16');
  process.nextTick(function () {
    console.log('18');
  })
  new Promise(function (resolve) {
    console.log('17');
    resolve(0);
  }).then(function () {
    console.log('19')
  })
})
