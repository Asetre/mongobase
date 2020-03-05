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
```
const mongobase = require('mongobase')

mongobase.init(url, database, options)
mongobase.start()

class UsersModel extends mongobase.Model {
}
const collectionName = 'Users'

const Collection = mongobase.create(collectionName, UsersModel)

const newUser = { hello: 'world' }

Colllection.create(newUser)
    .then(document => {
    })
```

## Advanced Usage
Usage with your own mongo database setup
```
const { MongoClient } = require('mongodb')
const { Model, collection } = require('mongobase')

const collectionName = 'users'
class CustomModel extends Model {
}

//Mongo setup
const { url, options, db } = configuration
MongoClient.connect(url, options, (err, client) => {
    if(err) return reject(err)

    const database = client.db(db)
    const Collection = collection(collectionName, CustomModel, database)

    const newDocument = { hello: 'fizz', world: 'buzz' }

    Collection
        .create(newDocument)
        .then(document => {
        })

})

```