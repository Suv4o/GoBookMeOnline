#!/usr/bin/env node
import * as dotenv from 'dotenv';
import * as yargs from 'yargs';
import * as fs from 'fs';
import { Pool } from 'pg';
dotenv.config({ path: `../env/${process.env.NODE_ENV}.env` });

const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'default_database',
  password: 'password',
  port: 5432,
});

pool.connect();

yargs
  .command('create', 'create schema', () => {
    pool.query('CREATE SCHEMA public ', (err) => {
      if (err) throw err;
      console.log('DATABASE SCHEMA - CREATED ');
      pool.end();
      process.exit(0);
    });
  })

  .command(
    'drop',
    'drop schema',
    () => {
      pool.query('DROP SCHEMA public CASCADE', (err) => {
        if (err) throw err;
        console.log('DATABASE SCHEMA - DROPPED ');
        pool.end();
        process.exit(0);
      });
    },
    (argv) => {
      console.log(argv);
    },
  )
  .option('env', {
    alias: 'e',
    type: 'string',
    description: 'Set env',
  }).argv;
