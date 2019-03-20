import { Schema } from "mongoose";

/**
 * Quick helper function to link reference
 *
 * @param {String} model
 * @param {any} options
 *
 * @returns { {type: "mongoose".Schema.Types.ObjectId, ref: model, ...options } }
 */
export function ref(model: String, options: any = {}) {
  return { type: Schema.Types.ObjectId, ref: model, ...options }
}