const { MongoClient } = require('mongodb')
const Model = require('./src/model.js')

var DATABASE

const configuration = {
    url: null,
    db: null,
    options: {
        useUnifiedTopology: true
    }
}

const init = (url, database, options) => {
    configuration.url = url
    configuration.db = database
    configuration.options = { ...configuration.options, ...options }
}

const collection = (name, CustomModel, database) => {
    if(!name) throw new Error('Missing database')

    if(!database) throw new Error('Missing database')

    if(!(CustomModel.prototype instanceof Model)) throw new Error('Class does not extend base')

    const col = database.collection(name)
    return new CustomModel(col)
}

const create = (name, CustomModel) => {
    if(!name) throw new Error('Missing database')

    if(!DATABASE) throw new Error('Missing database')

    if(!(CustomModel.prototype instanceof Model)) throw new Error('Class does not extend base')

    const col = DATABASE.collection(name)
    return new CustomModel(col)
}

const start = () => {
    if(!configuration.url) {
        throw new Error('Database URL not initialized')
    }

    if(!configuration.db) {
        throw new Error('Database name not initialized')
    }

    return new Promise((resolve, reject) => {
        const { url, options, db } = configuration
        MongoClient.connect(url, options, (err, client) => {
            if(err) return reject(err)
            DATABASE = client.db(db)
            resolve(client)
        })

    })
}

const close = () => {
    configuration.url = null
    configuration.database = null
}

const db = () => {
    return DATABASE
}

module.exports = { init, start, close, Model, db, collection, create }