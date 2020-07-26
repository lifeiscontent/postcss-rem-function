# PostCSS Rem Function

[PostCSS] plugin to add rem function to easily calculate rem values.

## Example

### Input

```scss
.demo {
  font-size: rem(24); /* using default 16 */
  padding: rem(5, 10); /* Explict base */
}
```

### Output

```css
.demo {
  font-size: 1.5rem; /* Simple */
  padding: 0.5rem; /* Explict base */
}
```

## Options

With `baseline` to `10`:

```css
.demo {
  font-size: 2.4rem; /* Simple */
  padding: 0.5rem; /* Multiple values */
}
```

## Usage

Install with `npm i postcss-rem-function` and use with [PostCSS]:

```js
postcss([require("@lifeiscontent/postcss-rem-function")]);
```

Example with custom options:

```js
postcss([
  require("@lifeiscontent/postcss-rem-function")({
    baseline: 10, // Default to 16
    precision: 6, // Default to 8
  }),
]);
```

See [PostCSS] docs for examples for your environment.

[postcss]: https://github.com/postcss/postcss
