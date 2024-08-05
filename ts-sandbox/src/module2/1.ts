function scope() {
  // 1. Number
  // The 'number' type represents both integer and floating-point numbers
  let age: number = 30; // An integer
  let price: number = 99.99; // A floating-point number

  // 2. String
  // The 'string' type represents textual data
  let name: string = "Alice"; // A simple string
  let greeting: string = `Hello, ${name}!`; // Template literal with string interpolation

  // 3. Boolean
  // The 'boolean' type has two values: true or false
  let isStudent: boolean = true;

  // 4. Array
  // Arrays can be defined in two ways in TypeScript
  let numbers: number[] = [1, 2, 3, 4, 5]; // Using square brackets notation
  let names: Array<string> = ["Alice", "Bob", "Charlie"]; // Using generic array type

  // 5. Tuple
  // Tuples allow you to express an array with a fixed number of elements whose types are known
  let person: [string, number] = ["Alice", 30]; // A tuple with a string and a number

  // 6. Enum
  // Enums allow us to define a set of named constants
  enum Color {
    Red, // 0
    Green, // 1
    Blue, // 2
  }
  let favoriteColor: Color = Color.Blue; // favoriteColor will be 2

  // 7. Any
  // 'any' is used when we want to opt-out of type checking
  let notSure: any = 4;
  notSure = "maybe a string instead"; // OK
  notSure = false; // OK, definitely a boolean

  // 8. Void
  // 'void' is used as the return type of functions that do not return a value
  function logMessage(message: string): void {
    console.log(message);
  }

  // 9. Null and Undefined
  // In TypeScript, both null and undefined have their own types
  let u: undefined = undefined;
  let n: null = null;

  // Object
  // 'object' represents any non-primitive type
  let user: object = { name: "Alice", age: 30 };

  // Never
  // The 'never' type represents the type of values that never occur
  // Represents the type of values that never occur. Typically used for functions that always throw an exception or never return
  function throwError(message: string): never {
    throw new Error(message);
  }
}
