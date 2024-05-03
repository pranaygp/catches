# catchme

An npm library called 'catchme' in TypeScript that executes a user-provided function and returns a fallback value if the function throws an error.

## Installation

```bash
npm install catchme
```

## Usage

```typescript
import { catchMe } from 'catchme';

// Define a user-provided function
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Use the catchMe function to execute the user-provided function
const result = catchMe(divide, 10, 0, 'Fallback value');

console.log(result); // Output: 'Fallback value'
```

The `catchMe` function takes a user-provided function as the first argument, followed by any arguments required by the function. If the user-provided function throws an error, the `catchMe` function returns the fallback value provided as the last argument.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) when making pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
```

This README.md file provides an overview of the library, installation instructions, usage examples, information on contributing, and the license details.