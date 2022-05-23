#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var yargs = require("yargs");
var pg_1 = require("pg");
dotenv.config({ path: "../env/".concat(process.env.NODE_ENV, ".env") });
var pool = new pg_1.Pool({
    user: 'username',
    host: 'localhost',
    database: 'default_database',
    password: 'password',
    port: 5432
});
pool.connect();
yargs
    .command('create', 'create schema', function () {
    pool.query('CREATE SCHEMA public ', function (err) {
        if (err)
            throw err;
        console.log('DATABASE SCHEMA - CREATED ');
        pool.end();
        process.exit(0);
    });
})
    .command('drop', 'drop schema', function () {
    pool.query('DROP SCHEMA public CASCADE', function (err) {
        if (err)
            throw err;
        console.log('DATABASE SCHEMA - DROPPED ');
        pool.end();
        process.exit(0);
    });
}, function (argv) {
    console.log(argv);
})
    .option('env', {
    alias: 'e',
    type: 'string',
    description: 'Set env'
}).argv;
