import { Model, Schema } from 'mongoose'
import { field, doc, pre, post, method } from '../src';

@doc()
export default class Post extends Model {
    @field(Schema.Types.String)
    title?: String

    @field(Schema.Types.String)
    page?: String
    
    @field({ type: Schema.Types.String })
    raw_content?: String

    @field([Schema.Types.String])
    hooks: String[] = []

    @pre('save')
    preLog() {
        this.hooks.push('pre save')
    }

    @post('save')
    postLlog() {
        this.hooks.push('post save')
    }

    /**
     * Define instance methods
     * @param prefix 
     */
    @method()
    prefixedTitle(prefix: string) {
        return prefix + this.title
    }

    /**
     * Define static methods
     * @param title 
     * @param cb 
     */
    static findByTitle(title: string, cb?: any): any {
        return this.find({ title: new RegExp(title, 'i') }, cb);
    }
}