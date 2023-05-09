const fs = require('fs');
const { describe, it, mock, resetState, run } = require('jest-circus');
const NodeEnvironment = require('jest-environment-node');
const vm = require('vm');
const  { expect } = require('expect');

exports.runTest = async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf8');

    const testResult = {
        errorMessage: null,
        success: false,
        testResults: []
    }

    try {
        resetState();
        const { testResults } = await run();
        testResult.testResults = testResults
        // testResult.success = testResults.every((result) => !result.errors.length);
        testResult.success = true;
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
        vm.runInContext(code, environment.getVmContext());
    
    } catch (error) {
        testResult.success = false
        testResult.errorMessage = error;
    }

    return testResult;
}