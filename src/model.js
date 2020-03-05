const { ObjectID } = require('mongodb')

function middleware() {
}

class Model {
    constructor(collection) {
        this.collection = collection
    }

    async create(data, options) {
        const response = await this.collection.insertOne(data, options)

        return response.ops[0]
    }

    async find(_id, options) {
        if(typeof _id === 'string') _id = new ObjectID(_id)

        const docs = await this.collection.find({ _id }, options).toArray()
        return docs[0]
    }

    async findAll(options) {
        const docs = await this.collection.find({}, options).toArray()
        return docs
    }

    async update(_id, updates, options) {
        if(typeof _id === 'string') _id = new ObjectID(_id)

        return this.collection.updateOne({ id }, { $set: { updates } })
    }

    async updateRaw(query, updates, options) {
        if(typeof _id === 'string') _id = new ObjectID(_id)

        return this.collection.update({ query }, updates, options)
    }

    async remove(_id) {
        if(typeof _id === 'string') _id = new ObjectID(_id)

        return this.collection.deleteOne({ _id })
    }
    
}

for (const key of Object.getOwnPropertyNames(Model.prototype)) {
    const met = Model.prototype[key]

    Model.prototype[key] = async function(...args) {
        middleware.call(this, ...args)
        return await met.call(this, ...args)
    }
}

module.exports = Model