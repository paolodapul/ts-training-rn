import { Text, View } from "react-native";

interface Vehicle {
  make: string;
  model: string;
  year: number;
  start(): string;
}

class Car implements Vehicle {
  public make: string;
  public model: string;
  public year: number;
  start(): string {
    return `${this.make} ${this.model} engine is starting...`;
  }

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

class Motorcycle implements Vehicle {
  public make: string;
  public model: string;
  public year: number;
  start(): string {
    return `${this.make} ${this.model} is revving up!`;
  }

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

export default function Index() {
  let myCar = new Car("Toyota", "Corolla", 2020);
  let myMotorcycle = new Motorcycle("Harley-Davidson", "Street 750", 2019);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{myCar.start()}</Text>
      <Text>{myMotorcycle.start()}</Text>
    </View>
  );
}
