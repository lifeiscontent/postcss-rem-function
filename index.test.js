const postcss = require("postcss");
const plugin = require("./");

function run(input, output, opts = {}) {
  return postcss([plugin(opts)])
    .process(input, { from: undefined })
    .then((result) => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    }).catch(e => {
      if (opts.willThrow) {
        expect(e.message).toEqual(output);
      } else {
        throw e;
      }
    });
}

it("can parse single value", () =>
  run(".simple { font-size: rem(24); }", ".simple { font-size: 1.5rem; }"));

it("can parse with value and base", () =>
  run(
    ".multiple { padding: rem(5, 16); }",
    ".multiple { padding: 0.3125rem; }"
  ));

it("Multiple mixed values", () =>
  run(
    ".mixed { border-bottom: rem(1) solid black; }",
    ".mixed { border-bottom: 0.0625rem solid black; }"
  ));

it("Comma-separated values", () =>
  run(
    ".comma { box-shadow: 0 0 rem(2) #ccc, inset 0 0 rem(5) #eee; }",
    ".comma { box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee; }"
  ));

it("Alternate use", () =>
  run(
    ".alternate { text-shadow: rem(1) rem(1) #eee, rem(-1) 0 #eee; }",
    ".alternate { text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee; }"
  ));

it("In function", () =>
  run(
    ".function { font-size: calc(rem(16) + 3vw); }",
    ".function { font-size: calc(1rem + 3vw); }"
  ));

it("Changing precision", () =>
  run(
    ".precision { font-size: rem(16, 12); }",
    ".precision { font-size: 1.333rem; }",
    {
      precision: 3,
    }
  ));

it("Changing baseline", () =>
  run(
    ".baseline { font-size: rem(16); }",
    ".baseline { font-size: 1.333rem; }",
    {
      precision: 3,
      baseline: 12,
    }
  ));

it("throws on non-finite number", () =>
  run(
    ".non-finite { font-size: rem(16, 0); }",
    "rem func parsed non-finite number",
    {
      willThrow: true
    }
  ));

  it("throws on NaN value", () =>
    run(".NaN { font-size: rem(16, w); }", "rem func parsed NaN", {
      willThrow: true,
    }));
