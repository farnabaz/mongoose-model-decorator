import mongoose from 'mongoose'
import Post from './Post'

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
})

afterAll(async () => {
    await mongoose.disconnect()
})

describe('simple test', () => {
    test('Create document', async () => {
        const post = await new Post({
            title: "title",
            raw_content: " content "
        }).save()
        expect(post._id).toBeDefined()
        expect(post.hooks).toBeDefined()
        expect(post.hooks.indexOf('pre save')).toBeGreaterThan(-1)
    })

    test('Fetch docs with custom static method and check instance method', async () => {
        const titles = await Post.findByTitle('title')
            .then((posts: Post[]) => posts.map(post => post.prefixedTitle('prefix--')))
        expect(titles[0]).toContain('prefix--')
    })
})