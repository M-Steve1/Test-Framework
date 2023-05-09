import  { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import  JestHasteMap  from 'jest-haste-map';
import { cpus } from 'os';
import fs from 'fs';
import { Worker }  from 'jest-worker';

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
const worker = new Worker(join(root, 'worker'), {
    enableWorkerThread: true
});

for await (const testFile of testFiles) {
    const code = await worker.runTest(testFile);
    console.log(code);
}

worker.end();