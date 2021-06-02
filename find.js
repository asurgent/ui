const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./src/**/*.js');

for (let li = 0; li < files.length; li++) {
  const file = files[li];
  const data = fs.readFileSync(file, 'utf8');
  let content = data.toString();
  const rems = content.match(/([0-9\.]+)rem/gm);

  if (rems) {
    for (let i = 0; i < rems.length; i++) {
      const unit = rems[i];
      const floatNumber = parseFloat(unit.replace('rem', ''));
      const newVal = floatNumber - (0.375 * floatNumber);
      const re = new RegExp(unit, 'g');
      const replaced = content.replace(re, `${newVal}rem`);
      content = replaced;
    }
    fs.writeFileSync(file, content, { encoding: 'utf8', flag: 'w' });
  }

  // const icons = content.match(/<MdiIcon(.|\n)+?(size=\{[0-9\.]+\})(.|\n)+?\/>/gm);
  // if (icons) {
  //   for (let i = 0; i < icons.length; i++) {
  //     const unit = icons[i];
  //     console.log(unit);
  //     // const floatNumber = parseFloat(unit.replace('rem', ''));
  //     // const newVal = floatNumber - (0.375 * floatNumber);
  //     // const re = new RegExp(unit, 'g');
  //     // const replaced = content.replace(re, `${newVal}rem`);
  //     // content = replaced;
  //   }
  //   // fs.writeFileSync(file, content, { encoding: 'utf8', flag: 'w' });
  // }
}
