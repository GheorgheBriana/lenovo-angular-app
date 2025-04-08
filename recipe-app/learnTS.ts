let hi: string = 'Hello';
console.log(hi);

// Enums
enum StatusCodes {
    NotFound = 404,
    Success = 200,
    BadRequest = 400,
  }

  let nf: StatusCodes = StatusCodes.NotFound;
  
  // TypeScript Arrays
const recipeNames: string[] = [];
// recipeNames.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// Object Types
const car: { type: string; model: string; year: number } = {
    type: 'Toyota',
    model: 'Corolla',
    year: 2025,
  };
  
// Template Literals
const variable = 'TypeScript';
const message = `Hello, ${variable}!`;

// Interfaces
export interface User {
    name: string;
    age?: number;
  }

// Inline interfaces
function getUser(): { name: string; age?: number } /*User*/ {
    return { name: 'test', age: 1 };
  }
  
// Classes
class Car {
    model: string;
  
  
    constructor(model: string) {
      this.model = model;
    }
  
  
    drive(): void {
      console.log(`Driving a ${this.model}`);
    }
  }

let myCar = new Car('Tesla');
myCar.drive(); // Output: Driving a Tesla
  