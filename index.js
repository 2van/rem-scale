import CSSJSON from 'css-to-json';
import fs from 'fs';
let inputCss = fs.readFileSync('input.scss');
var json = CSSJSON.toJSON(inputCss);
let cssObj = json;

// rem to px
const htmlFontSize = 37.5;
function recur(obj) {
  for (let j in obj.attributes) {
    const value = obj.attributes[j];
    if (value.includes('rem')) {
      let arr = value.split(' ');
      arr = arr.map((v) => {
        if (!v.includes('rem')) {
          return v;
        }
        let remIdx = v.indexOf('rem');
        let [number, str] = [v.slice(0, remIdx), v.slice(remIdx)];
        if (isNaN(number)) {
          console.log('todo:', v);
          return v;
        }
        number = Number(number);
        number *= htmlFontSize;
        number = number.toFixed(3);
        return number + str.replace('rem', 'px');
      });
      obj.attributes[j] = arr.join(' ');
      //   obj.attributes[j] = value.replace()
    }
  }

  if (obj.children) {
    for (let i in obj.children) {
      recur(obj.children[i]);
    }
  }
}
function main() {
  recur(cssObj);
  // console.log(cssObj);

  // To CSS
  var css = CSSJSON.toCSS(json);
  fs.writeFile('output.scss', css, () => {});
  // console.log(css);
}
try {
  main();
} catch (error) {
  console.log(error);
}
