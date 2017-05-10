# Mastering TypeScript
Speaker: Yakov Fain [@yfain](https://twitter.com/yfain)
Author of "Angular 2 Development with TypeScript"

A lot of this is based off a set of slides that was presented during the session.  These notes are best used with a supplement of those slides.
## What is TypeScript?
A superset of JavaScript developed by Microsoft which compiles into a human-readable JavaScript.

Typescript is completely compatible with JavaScript.  You can take a `js` file and rename it to `ts` and it will compile.

### Why use TypeScript?
It's well supported by IDEs.  It compiles into a human-readable JavaScript.  You will also get compilation errors just like in Java/C#.

TypeScript has an optional static type.  You don't need to define what the type is (inferred typing).  Supports classes, interfaces, generics, annotations, public/private/protected.  Code completion in IDEs.

### Installation
Global installation
```
npm i typescript -g
```

or local install (may be better):
```
npm i typescript --save-dev
```

#### Local Installation Better?
You may aleady have TypeScript installed (older version).  Global installation means that your dependence on TypeScript is coupled to the system-wide version.

### Compilation
1. Create a new directory and cd into it.
2. Create a new file
```typescript
let myName: string;
myName = "Yakov Fain";
console.log(`Hello ${myName}`);
```
3. Compile using `tsc --t es5 hello.ts`

The `--t` flag tells the compiler which specification to target.

Alternatively you can create a `tsconfig.json`.
```json
{
    "compilerOptions": {
        "outDir": "./dist",
        ...
    }
}
```

You can use a `package.json` to compile with tsc locally.  The command is `npm run tsc`.

### Visual Studio Code IDE
Can use `code .` to start the IDE from command line.

## Syntax
### Fat Arrow Functions
Fat arrow functions
```typescript
let getName = () => 'John Smith';
console.log(`The name is ` + getName());
```

Anonymous
```javascript
var getName = function() { return 'John Smith';};
console.log("The name is " + getName());
```

All I did was remove the word function.  Any parameters can still go inside of the parenthesis.  This gives you a predictable `this`.  Normally you have to reassign `this` to something like `self` before using an anonymous function.

See: `fatArrow.ts` example.

### A Class With Constructor. Take 1
Since JavaScript doesn't support private variables it is only an error when compiling `ts` to `js`.

Don't need the boilerplate code for constructors can use:
```typescript
constructor(public firstName: string, public lastName: string)
```

### ES6 Modules vs Global Scope
An **ES6 module** is a file with the code that uses `import` or `export` statements.  Provides separate scope for its members.  All members are treated on the global scope if the file is not an ES6 module.

### Namespaces
TypeScript lets you declare namespaces and export required members to avoid name collisions.

```typescript
namespace People {
    export class Person {
        constructor(...) { }
    }
}
```

Then to use: 
```typescript
let p = new People.Person(...);
```
See: `classes-namespaces.ts` demo.

### Inheritance
JavaScript uses prototypal inheritance.  TypeScript allos for classes to extend other classes:
```ts
class Employee extends Person {
    ...
}
```

### Generics
Similar to what we have in Java.  You can pass a parameter to the Object to insure that only properly typed objects are used:
```ts
let workers: Array<Person> = []; // only allows implementations of Person to be stored in the array.
```

You don't need to actually extend `Person` in this example.  As long as the classes have the same structure, it will still compile.  If `Person` and `Animal` have the same structure but `Animal` doesn't `extend Person` it still works.

This is not like a Java interface.  Storing members in the Array accesses the objects directly.  Don't compare this to an `ArrayList<SomeInterface>` in Java where you are limited to only the interface methods.

### Interfaces
You can declare an interface in TypeScript:
```ts
interface Comparator<T> {
    compareTo(value: T): number;
}
```

and then
```ts
class Rectangle implements Comparator<Rectangle>
```

Another example:
```ts
interface IPerson {
    firstName: string;
    ssn?: string; // optional
}
```

Using interface anonymously:
```ts
let aPerson: IPerson = { firstName: 'Steve' }
let bPerson: IPerson = { firstName: 'Steven', ssn: '1234'} 
```

What's the point of having optional parameters on the interface?  Interface in TypeScript is ONLY for the developer.  It does not exist in JavaScript.

It seems like interfaces anonymously is like a `struct` but interface implementation seems close to actual interfaces.

### Destructuring
I can pull parts of an object inline:
```ts
let {symbol, price} = getStock() //returns an object w/ many members including symbol and price.
```

Can also use this in method parameters:
```ts
onInputEvent({target}):void{
    ...
}
```
It will extract the `target` property from the passed in object.  This is part of ES6.

### Union Type
Allows you to specify an either or type:
```ts
function padLeft(value: string, padding: number | string ) { ... }
```
This requires that `value` is a `string` and `padding` and be a `number` or a `string`.

### Intersection Type
You can use an ampersand to combine types:
```ts
type TheWorker = IPerson & IEmployee;
```

This combines both interfaces into a single type.

### Mixins
A piece of functionality that can be reused by any object.  This is another implementation of intersection types.

```ts 
class TaxSpecial extends Tax implements TaxMixin {
    // see mixin boilerplate in example
}
```

TypeScript doesn't support multiple inheritance so this is the compromise?

### Callbacks, Promises to Async/Await
ES2017 will have this and TypeScript already does.
```ts
async function getCustomersOrders() {
    try {
        const customer = await getCustomers(); // no callback
        const orders = awat getOrders(customer);
    } catch (err) {
            console.log(err);
    }
}
```
Provides two keywords `await` and `async`.

`async` declares the function as asynchronous and `await` pauses the execution until an async code completes.

### Linters
There is TSLint which can be used to lint your code.  There is also TSLint + codelyzer (Angular-CLI) which customizes to Angular Style Guide.

### Type Definition Files
Type definition files `*.d.ts` contains declarations of types for JavaScript libraries and frameworks.  Used by the IDE for autocomplete.

On npm these are part of `@types/`. IE: `npm i @types/jquery --save`

### Using 3rd Party Library in TS
#### Approach 1
Example, you want to use `jQuery-ui`.  You can add the required library scripts and CSS to your `index.html`.  You can then use the lib's global variable in your TypeScript code:
```ts
$(this.hostElement.nativeElement).selectmenu();
```

However, you will not get help from your IDE.

#### Approach 2
Install Type definition file.  This enables TypeScript's compile errors and autocomplete.

## General Thoughts
The benefit of TypeScript seems to be in its ability to catch potential errors without hitting sections of code.  Some of the features appear to exist as only a way for providing safeguards. 