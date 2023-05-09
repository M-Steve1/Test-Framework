import  { fileURLToPath } from 'url'
import { dirname } from 'path'
import  JestHasteMap  from 'jest-haste-map'
import { cpus } from 'os'
import fs from 'fs'

const root = dirname(fileURLToPath(import.meta.url))
const hasteMapOptions = {
    rootDir: root,
    roots: [root],
    maxWorkers: cpus().length,
    extensions: ['js'],
    name: "Stephen-test-framework",
    platforms: []
}

const jestHasteMap = new JestHasteMap.default(hasteMapOptions);
await jestHasteMap.setupCachePath(hasteMapOptions);
const { hasteFS } = await jestHasteMap.build();
const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);

Array.from(testFiles).map(async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf8');
})