# Mongobase
## Overview
A lightweight starter template based off the native mongodb driver. Comes with basic CRUD operations and middleware support.

# Getting started
## Installation
```
npm install mongobase
```
or

```
yarn add mongobase
```

## Basic Usage
```javascript
const mongobase = require('mongobase')

mongobase.init(url, database, options)
mongobase.start()
    .then(() => {
        class UsersModel extends mongobase.Model {
        }
        const collectionName = 'Users'

        const Collection = mongobase.create(collectionName, UsersModel)

        const newUser = { hello: 'world' }

        Colllection.create(newUser)
            .then(doc => {
                console.log(doc)
                //{ hello: 'world', _id: 5e60b3d317e6c15153f0476f }
            })
    })
```

## Advanced Usage
Usage with your own mongo database setup
```javascript
const { MongoClient } = require('mongodb')
const { Model, collection } = require('mongobase')

const collectionName = 'users'
class CustomModel extends Model {
}

const { url, options, db } = configuration
MongoClient.connect(url, options, (err, client) => {
    if(err) return reject(err)

    const database = client.db(db)
    const Collection = collection(collectionName, CustomModel, database)

    const newDocument = { hello: 'fizz', world: 'buzz' }

    Collection
        .create(newDocument)
        .then(doc => {
            console.log(doc)
            //{ hello: 'fizz', world: 'buzz', _id: 5e60b3d317e6c15153f0476f }
        })

})

```