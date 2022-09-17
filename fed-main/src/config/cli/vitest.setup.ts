#!/usr/bin/env node
import * as yargs from 'yargs'
import { createUserWithEmail, signInWithToken } from './vitest.utils'
import * as fs from 'fs'

let accessToken = ''

async function getIdToken() {
  const createdUser = await createUserWithEmail()
  const signedInUser = await signInWithToken(createdUser.customToken)
  return await signedInUser.user?.getIdToken()
}

async function readVitestStore() {
  const vitestStore = await fs.promises.readFile('src/config/vitest.store.json', 'utf8')
  return vitestStore
}

async function writeVitestStore(vitestStore: string) {
  await fs.promises.writeFile('src/config/vitest.store.json', vitestStore)
}

yargs.command(
  'setup',
  'set vitest store',
  async () => {
    try {
      accessToken = await getIdToken()
      const vitestStoreJson = await readVitestStore()
      const vitestStore = JSON.parse(vitestStoreJson)
      vitestStore.EmailVerificationPage.accessToken = accessToken
      await writeVitestStore(JSON.stringify(vitestStore))
    } catch (error) {
      console.log('Error vitest store setup:', error)
    }
  },
  argv => {
    console.log(argv)
  }
).argv
