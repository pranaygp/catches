# ⚽ catches

Some functions throw errors. Maybe you don't care about any errors. The show must go on.

Maybe you do this:

```typescript
let data: string | undefined
try {
  data = getSomeString()
} catch () {
  // Silently ignore the error.
  // We don't really need the data anyway.
}

```

That's a lot of lines.

We can do better

Introducing `catches`

```typescript
const data = catches(getSomeString) // => string | undefined
```

It's that easy

There's more!

```typescript
// want to fallback if the function throws? easy

const data = catches(getSomeString) ?? "fallback" // => string

// what if the function is synchronous?
// what if it is async?
// and what if the promise is rejected
// and what if the function throws even before a promise is returned

// ...

// what do you think?
// of course it still works
const data = await catches(async () => "...") ?? "fallback"


// wait. but what if my function needs arguments?

// well. just add them at the end
const data = catches(getSomeString, 1, 2)

// easy
```


## Installation

```bash
npm install catches

# stop
# are you srsly using npm
# it's 2024 (or later)

bun i catches # (note: not a real command)

# don't like bun?
# well lucky you
# this is javascript

yarn add catches
pnpm i catches
oro add catches
```


## Contributing

I mean. It's kinda done right? There's nothing left here. Stop reading, go use `catches`, save yourself some time, spend it with your family. You won't get this time back. I'm serious. Look outside. What a beautiful day. Now look at this README. Do you really want to contribute to this? I mean...

But no, seriously. If you do want to contribute. Please do. I'd love that.

## License

This project is licensed under the [GPL v3 or Later](LICENSE).
```
