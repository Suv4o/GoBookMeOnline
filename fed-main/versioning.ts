import * as fs from 'fs'
import simpleGit, { SimpleGit, CleanOptions } from 'simple-git'

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE)

const rawData = fs.readFileSync('package.json')
const packageJSON = JSON.parse(rawData.toString())

console.log(packageJSON)
