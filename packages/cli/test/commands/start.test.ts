import { expect } from '../expect'
import { restore, fake, replace } from 'sinon'
import rewire = require('rewire')
import { ProviderLibrary } from '@boostercloud/framework-types'
import { test } from '@oclif/test'
import * as environment from '../../src/services/environment'

const start = rewire('../../src/commands/start')
const runTasks = start.__get__('runTasks')

describe('start', () => {
  afterEach(() => {
    restore()
  })

  describe('runTasks function', () => {
    it('calls the runner for the local server', async () => {
      const fakeProvider = {} as ProviderLibrary
      const fakeConfig = {
        provider: fakeProvider,
        appName: 'fake-app',
      }

      const fakeLoader = fake.resolves(fakeConfig)
      const fakeRunner = fake()
      replace(environment, 'currentEnvironment', fake.returns('test-env'))

      await runTasks(3000, fakeLoader, fakeRunner)

      expect(fakeRunner).to.have.been.calledOnce
    })
  })

  describe('run', () => {
    context('when no environment provided', async () => {
      test
        .stdout()
        .command(['start'])
        .it('shows no environment provided error', (ctx) => {
          expect(ctx.stdout).to.match(/No environment set/)
        })
    })
  })
})
