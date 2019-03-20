# Mongoose Model Decorator
Set of decorators to define mongoose model with es6 class

## Installation
```
yarn add -D mongoose-model-decorator
```

## Usage
- Create a model
```ts
/**
 * Post.ts
 **/
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
    tag: String[] = []

    @pre('save')
    preLog() {
        this.tag.push('pre save')
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
```
- And use it
```ts
import mongoose from 'mongoose'
import Post from './Post'

await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

Post.findByTitle('title')
    .then(posts => posts.map(post => post.prefixedTitle('prefix--')))
    .then(titles => console.log(titles))
```

- If you receive error while using decorators, add `"experimentalDecorators": true` in `compilerOptions` of your `tsconfig.json` 


## Inspired of
- [mongoose-class](https://github.com/jamg44/mongoose-class)
- [node-decorators](https://github.com/serhiisol/node-decorators)