#!/usr/bin/env node
import * as dotenv from 'dotenv'
import * as yargs from 'yargs'
import { Pool } from 'pg'
const env = dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

const pool = new Pool({
  user: env.parsed?.VITE_DB_USER,
  host: env.parsed?.VITE_DB_HOST,
  database: env.parsed?.VITE_DB_NAME,
  password: env.parsed?.VITE_DB_PASSWORD,
  port: Number(env.parsed?.VITE_DB_PORT),
})

pool.connect()

yargs.command('delete', 'delete tables', () => {
  pool.query('TRUNCATE TABLE "user" CASCADE', err => {
    if (err) throw err
    console.log('DATABASE TABLES - DELETED ')
    pool.end()
    process.exit(0)
  })
}).argv
