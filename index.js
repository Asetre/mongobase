const { MongoClient } = require('mongodb')
const Model = require('./src/model.js')

const configuration = {
    url: null,
    database: null
}

const init = (url, database, options) => {
    configuration.url = url
    configuration.database = database
    configuration.options = options
}

const start = () => {
    if(!configuration.url) {
        throw new Error('Database URL not initialized')
    }

    return new Promise((resolve, reject) => {
        const { url, options } = configuration
        MongoClient.connect(url, options, (err, client) => {
            if(err) return reject(err)

            console.log('Connect to the database')
        })
    })
}

const close = () => {
    configuration.url = null
    configuration.database = null
}

module.exports = { init, start, close, Model }