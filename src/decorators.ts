import mongoose, { Model } from "mongoose";
import { findDefinition } from "./store";

export function doc(config: any = {}): (decoratedClass: any) => any {
  return function docDecorator(decoratedClass: any): Model<any> {
    const options: any = config.options;
    const name: string = decoratedClass.name;

    // create Schema
    const definition = findDefinition(name)

    const schema = definition.createSchema(decoratedClass, options);

    if (typeof config.beforeCreate === "function") {
      config.beforeCreate(schema);
    }

    return mongoose.model(name, schema);
  };
}

export function field(fieldDef: any): (target: any, fieldName: string) => void {
  return function fieldDecorator(target: any, fieldName: string): void {
    const name: string = target.constructor.name;

    const definition = findDefinition(name);

    definition.addField(fieldName, fieldDef);
  };
}

export function pre(method: string): (target: any, fieldName: string) => void {
  return function fieldDecorator(target: any, fieldName: string): void {
    const name: string = target.constructor.name;

    const definition = findDefinition(name);

    definition.addPreHook(method, target[fieldName]);
  };
}

export function post(method: string): (target: any, fieldName: string) => void {
  return function fieldDecorator(target: any, fieldName: string): void {
    const name: string = target.constructor.name;

    const definition = findDefinition(name);

    definition.addPostHook(method, target[fieldName]);
  };
}

export function method(): (target: any, fieldName: string) => void {
  return function fieldDecorator(target: any, fieldName: string): void {
    const name: string = target.constructor.name;

    const definition = findDefinition(name);

    definition.addMethod(fieldName, target[fieldName]);
  };
}
