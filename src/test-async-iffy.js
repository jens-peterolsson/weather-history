(async () => {
  const strings = ['Promise started', 'Promise resolved'];

  let ix = 0;

  await Promise.all(
    strings.map(async item => {
      ix += 1;

      return new Promise(resolve => {
        const data = `${item} ${ix}.`;
        setTimeout(() => {
          console.log(data);
          console.log(new Date());
          resolve(data);
        }, 1500);
      });
    })
  );
})();

console.log('Main done.');
