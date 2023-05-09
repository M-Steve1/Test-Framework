import  { fileURLToPath } from 'url';
import { dirname, join, relative } from 'path';
import  JestHasteMap  from 'jest-haste-map';
import { cpus } from 'os';
import { Worker }  from 'jest-worker';
import chalk from 'chalk';

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
const testFiles = hasteFS.matchFilesWithGlob([process.argv[2] ? `**/${process.argv[2]}*`: '**/*.test.js']);
const worker = new Worker(join(root, 'worker'), {
    enableWorkerThread: true
});

let hasFailed;

for await (const testFile of testFiles) {
    const { success, testResults, errorMessage } = await worker.runTest(testFile);
    const status = success ? chalk.green.inverse.bold('PASS') : chalk.red.inverse.bold('FAIL');
    console.log(`${status} ${chalk.dim(relative(root, testFile))}`);


    if(!success) {
        hasFailed = true;
        // Make use of the well-detailed `testResults` and error messages
        if(testResults.length > 0 && testResults !== []) {
            // Filter the testResults and only gets the test that failed
            testResults
            .filter((result) => result.errors.length)
            .forEach((result) => console.log(
                result.testPath.slice(1).join(" ") + "\n" + result.errors[0]
            ));
            // If it crashes before `jest-circus ran report this`
        } else if (errorMessage) {
            console.log(" " + errorMessage);
        }
    }
}


worker.end();

if(hasFailed) {
    console.log(chalk.red.bold('\n Test run failed, fix all failing tests'));
    process.exitCode = 1 // set exit code if test fails
}