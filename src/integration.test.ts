import config from 'config'
import { PatternDetector } from './PatternDetector'

const patternDefinitions =
  config.get<Record<string, string>>('patternDefinitions')

const integrationTestCases = config.get('integrationTest.cases') as Record<
  string,
  Set<string>
>

describe('integration test', () => {
  const detector = new PatternDetector(patternDefinitions)

  for (const [givenStr, expectedPatterns] of Object.entries(
    integrationTestCases,
  )) {
    it(`${givenStr}: ${[...expectedPatterns].join(', ')}`, () => {
      expect(detector.detect(givenStr)).toMatchSet(expectedPatterns)
    })
  }
})
