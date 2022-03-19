import simpleGit, { SimpleGit, CleanOptions } from 'simple-git'
import type { PackageJson } from 'types-package-json'
import * as fs from 'fs'

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE)

const rawData = fs.readFileSync('package.json')
const packageJson: Partial<PackageJson> = JSON.parse(rawData.toString())
const version = packageJson.version

try {
  git.add('./package.json')
  git.commit(`Version bump to ${version}`)
  git.addAnnotatedTag(version, `Increment version to ${version.substring(1, version.length)}`)
} catch (error) {
  console.error(error)
}
