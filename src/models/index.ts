'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, Op, QueryTypes } from 'sequelize';

const basename = path.basename(__filename);
const db: any = {};

// Create a new Sequelize instance for database connection
const sequelize = new Sequelize(
    global.config.DATABASE.name,
    global.config.DATABASE.username,
    global.config.DATABASE.password,
    {
        dialect: 'mysql',
        host: global.config.DATABASE.host,
        logging: false,
    }
);

// Authenticate the Sequelize instance
sequelize.authenticate()
    .then(() => {
        console.log("Db Connected");
    })
    .catch((err: any) => {
        console.log("Db Error", err.message);
    });

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))
        db[model.default] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;

export { db, sequelize, QueryTypes }
