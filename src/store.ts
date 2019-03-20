import { Schema } from "mongoose";

class Definition {
  fields: { [key: string]: any } = {}
  preHooks: any[] = []
  postHooks: any[] = []
  statics: any[] = []
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

  addStatic(name: string, handler: any) {
    this.statics.push({
        name,
        handler
    })
  }

  addMethod(name: string, handler: any) {
    this.methods.push({
        name,
        handler
    })
  }

  createSchema(options: any): Schema {
    const schema = new Schema(this.fields, options);

    this.apply(schema)
    
    return schema;
  }

  apply(schema: Schema) {
    this.preHooks.forEach((hook) => {
      schema.pre(hook.method, hook.handler)
    })
    this.postHooks.forEach((hook) => {
      schema.post(hook.method, hook.handler)
    })

    this.statics.forEach((method) => {
      schema.statics[method.name] = method.handler;
    })

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
