#!/usr/bin/env node
import * as yargs from 'yargs'
import * as dotenv from 'dotenv'
import * as admin from 'firebase-admin'
const env = dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

const userIds = [] as string[]

const app: admin.app.App = admin.initializeApp({
  credential: admin.credential.cert({
    type: env.parsed?.VITE_FIREBASE_TYPE,
    project_id: env.parsed?.VITE_FIREBASE_PROJECT_ID,
    private_key_id: env.parsed?.VITE_FIREBASE_PRIVATE_KEY_ID,
    private_key: Buffer.from(env.parsed?.VITE_FIREBASE_PRIVATE_KEY || '', 'base64').toString(),
    client_email: env.parsed?.VITE_FIREBASE_CLIENT_EMAIL,
    client_id: env.parsed?.VITE_FIREBASE_CLIENT_ID,
    auth_uri: env.parsed?.VITE_FIREBASE_AUTH_URI,
    token_uri: env.parsed?.VITE_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: env.parsed?.VITE_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: env.parsed?.VITE_FIREBASE_CLIENT_X509_CERT_URL,
  } as any),
})

const getAllUsersIds = async (nextPageToken?: string) => {
  try {
    const listUsersResult = await app.auth().listUsers(1000, nextPageToken)
    listUsersResult.users.forEach(userRecord => {
      userIds.push(userRecord.uid)
    })
    if (listUsersResult.pageToken) {
      getAllUsersIds(listUsersResult.pageToken)
    }
  } catch (error) {
    console.log('Error listing users:', error)
  }
}

yargs.command(
  'drop',
  'firebase drop users',
  async () => {
    await getAllUsersIds()
    if (userIds.length) {
      try {
        const deleteUsersResult = await app.auth().deleteUsers(userIds)
        console.log(`Successfully deleted ${deleteUsersResult.successCount} users`)
        console.log(`Failed to delete ${deleteUsersResult.failureCount} users`)
      } catch (error) {
        console.log('Error deleting users:', error)
      }
    } else {
      console.log('No users to delete')
    }
  },
  argv => {
    console.log(argv)
  }
).argv
