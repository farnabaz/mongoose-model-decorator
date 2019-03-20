import { Schema } from "mongoose";

class Definition {
  fields: { [key: string]: any } = {}
  preHooks: any[] = []
  postHooks: any[] = []
  methods: any[] = []

  addField(name: string, value: any) {
    this.fields[name] = value;
  }

  addPreHook(method: string, handler: any) {
    this.preHooks.push({
        method,
        handler
    })
  }

  addPostHook(method: string, handler: any) {
    this.postHooks.push({
        method,
        handler
    })
  }

  addMethod(name: string, handler: any) {
    this.methods.push({
        name,
        handler
    })
  }

  createSchema(decoratedClass: any, options: any): Schema {
    const schema = new Schema(this.fields, options);

    this._applyHooks(schema)
    this._applyMethods(schema)
    this._applyStatics(decoratedClass, schema)

    return schema;
  }

  _applyStatics(decoratedClass: any, schema: Schema) {
    Object.getOwnPropertyNames(decoratedClass).forEach(p => {
        if (typeof decoratedClass[p] === 'function')
        schema.statics[p] = decoratedClass[p];
    });
  }

  _applyHooks(schema: Schema) {
    this.preHooks.forEach((hook) => {
      schema.pre(hook.method, hook.handler)
    })
    this.postHooks.forEach((hook) => {
      schema.post(hook.method, hook.handler)
    })
  }

  _applyMethods(schema: Schema) {
    this.methods.forEach((method) => {
      schema.methods[method.name] = method.handler;
    })
  }
}

const definitions: { [key: string]: Definition } = {};

export function findDefinition(name: string): Definition {
  if (definitions[name] === undefined) {
    definitions[name] = new Definition();
  }
  return definitions[name];
}
