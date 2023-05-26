
## Reference

### Expect
- expect(value)
### Modifiers
- .not
- .resolves
- .rejects
### Matchers
- .toBe(value)
- .toHaveBeenCalled()
- .toHaveBeenCalledTimes(number)
- .toHaveBeenCalledWith(arg1, arg2, ...)
- .toHaveBeenLastCalledWith(arg1, arg2, ...)
- .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
- .toHaveReturned()
- .toHaveReturnedTimes(number)
- .toHaveReturnedWith(value)
- .toHaveLastReturnedWith(value)
- .toHaveNthReturnedWith(nthCall, value)
- .toHaveLength(number)
- .toHaveProperty(keyPath, value?)
- .toBeCloseTo(number, numDigits?)
- .toBeDefined()
- .toBeFalsy()
- .toBeGreaterThan(number | bigint)
- .toBeGreaterThanOrEqual(number | bigint)
- .toBeLessThan(number | bigint)
- .toBeLessThanOrEqual(number | bigint)
- .toBeInstanceOf(Class)
- .toBeNull()
- .toBeTruthy()
- .toBeUndefined()
- .toBeNaN()
- .toContain(item)
- .toContainEqual(item)
- .toEqual(value)
- .toMatch(regexp | string)
- .toMatchObject(object)
- .toMatchSnapshot(propertyMatchers?, hint?)
- .toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
- .toStrictEqual(value)
- .toThrow(error?)
- .toThrowErrorMatchingSnapshot(hint?)
- .toThrowErrorMatchingInlineSnapshot(inlineSnapshot)
### Asymmetric Matchers
- expect.anything()
- expect.any(constructor)
- expect.arrayContaining(array)
- expect.not.arrayContaining(array)
- expect.closeTo(number, numDigits?)
- expect.objectContaining(object)
- expect.not.objectContaining(object)
- expect.stringContaining(string)
- expect.not.stringContaining(string)
- expect.stringMatching(string | regexp)
- expect.not.stringMatching(string | regexp)
### Assertion Count
- expect.assertions(number)
- expect.hasAssertions()
- Extend Utilities
- expect.addEqualityTesters(testers)
- expect.addSnapshotSerializer(serializer)
- expect.extend(matchers)


### Steps In Building a Testing Framework
- Efficiently search for test files
- Run all the tests in parallel
- Use an assertion framework
- Isolate tests from each other
- Advanced Testing
