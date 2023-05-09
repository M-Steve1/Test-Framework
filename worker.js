const fs = require('fs');
const { describe, it, mock, resetState, run } = require('jest-circus');
const NodeEnvironment = require('jest-environment-node');
const vm = require('vm');
const  { expect } = require('expect');
const { join, dirname, basename } = require('path');

exports.runTest = async (testFile) => {
    const testResult = {
        errorMessage: null,
        success: false,
        testResults: []
    }

    try {
        resetState();

        const customRequire = (fileName) => {
            const code = fs.readFileSync(join(dirname(testFile), fileName), 'utf8');
            const moduleFactory = vm.runInContext(
                `(function(module, require){${code}})`,
                environment.getVmContext()
                );

            const module = { exports: {}};
            moduleFactory(module, customRequire);
            
            return module.exports;
        }

        const environment = new NodeEnvironment.default({
            projectConfig: {
                testEnvironmentOptions: {
                    expect,
                    describe,
                    it,
                    mock,
                }
            }
        })
        customRequire(basename(testFile));
        const { testResults } = await run();
        testResult.testResults = testResults
        testResult.success = testResults.every((result) => !result.errors.length);

    
    } catch (error) {
        testResult.errorMessage = error;
    }

    return testResult;
}