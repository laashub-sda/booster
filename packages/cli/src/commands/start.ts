import { Command, flags } from '@oclif/command'
import { startProvider } from '../services/provider-service'
import { compileProjectAndLoadConfig } from '../services/config-service'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Script } from '../common/script'
import Brand from '../common/brand'
import { logger } from '../services/logger'
import { currentEnvironment, initializeEnvironment } from '../services/environment'

const runTasks = async (
  port: number,
  loader: Promise<BoosterConfig>,
  runner: (config: BoosterConfig) => Promise<void>
): Promise<void> =>
  Script.init(`boost ${Brand.canarize('debug')} [${currentEnvironment()}] 🐛`, loader)
    .step(`Starting debug server on port ${port}`, runner)
    .done()

export default class Start extends Command {
  public static description = 'Start local debug server.'

  public static flags = {
    help: flags.help({ char: 'h' }),
    port: flags.integer({
      char: 'p',
      description: 'port to run the local runtime on',
      default: 3000,
    }),
    environment: flags.string({
      char: 'e',
      description: 'environment configuration to run',
    }),
  }

  public async run(): Promise<void> {
    const { flags } = this.parse(Start)
    if (initializeEnvironment(logger, flags.environment)) {
      await runTasks(flags.port, compileProjectAndLoadConfig(), startProvider.bind(null, flags.port))
    }
  }
}
