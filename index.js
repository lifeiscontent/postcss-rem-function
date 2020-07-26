const postcss = require("postcss");

const pluginName = "@lifeiscontent/postcss-rem-function";
const functionName = "rem";

const rounded = (value, precision) => {
  precision = Math.pow(10, precision);
  return Math.floor(value * precision) / precision;
};

module.exports = postcss.plugin(
  pluginName,
  ({ precision = 8, baseline = 16 } = {}) => (root) => {
    const regexp = new RegExp(
      "(?!\\W+)" + functionName + "\\(([^()]+)\\)",
      "g"
    );

    const convert = (_, values) => {
      const [value, base = baseline] = values
        .split(",")
        .map((v) => parseInt(v.trim()), 10);
      const parsedValue = rounded(value / base, precision);

      if (isNaN(parsedValue)) {
        throw new Error('rem func parsed NaN');
      }

      if (isFinite(parsedValue) === false) {
        throw new Error('rem func parsed non-finite number');
      }

      return `${parsedValue}rem`;
    };

    root.replaceValues(regexp, { fast: functionName + "(" }, convert);
  }
);
