import config from 'config'
import { PatternDetector } from '../src/PatternDetector'

const patternDefinitions =
  config.get<Record<string, string>>('patternDefinitions')

const integrationTestCases = config.get('integrationTest.cases') as Record<
  string,
  Set<string>
>

describe('Integration Test', () => {
  const detector = new PatternDetector(patternDefinitions)

  for (const [givenStr, expectedPatterns] of Object.entries(
    integrationTestCases,
  )) {
    test(`${givenStr}: ${[...expectedPatterns].join(', ')}`, () => {
      expect(detector.detect(givenStr)).toMatchSet(expectedPatterns)
    })
  }
})
