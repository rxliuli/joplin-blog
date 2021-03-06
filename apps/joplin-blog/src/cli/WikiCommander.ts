import {
  Application,
  ApplicationConfig,
  BaseIntegrated,
} from '../blog/Application'
import { BlogHexoIntegratedConfig } from '../blog/BlogHexoIntegrated'
import path from 'path'
import { pathExists, readJson } from 'fs-extra'
import { i18n, LanguageEnum } from '../util/I18n'
import { figletPromise } from '../util/utils'
import ora from 'ora'
import { Command } from 'commander'
import {
  WikiDocsifyIntegrated,
  WikiDocsifyIntegratedConfig,
} from '../wiki/WikiDocsifyIntegrated'
import {
  WikiVuepressIntegrated,
  WikiVuepressIntegratedConfig,
} from '../wiki/WikiVuepressIntegrated'

type JoplinBlogConfig = ApplicationConfig & {
  type: 'docsify' | 'vuepress'
  language?: LanguageEnum
} & (BlogHexoIntegratedConfig | {})

export class BlogCommanderProgram {
  private static async getBlogApplication(config: JoplinBlogConfig) {
    let integrated: BaseIntegrated
    switch (config.type) {
      case 'docsify':
        integrated = new WikiDocsifyIntegrated(
          config as WikiDocsifyIntegratedConfig,
        )
        break
      case 'vuepress':
        integrated = new WikiVuepressIntegrated(
          config as WikiVuepressIntegratedConfig,
        )
        break
      default:
        throw new Error(i18n.t('wiki.Unsupported wiki framework'))
    }
    return new Application(config, integrated)
  }

  async checkConfig(): Promise<JoplinBlogConfig | false> {
    const configPath = path.resolve('.joplin-blog.json')
    if (!(await pathExists(configPath))) {
      console.error(
        i18n.t("wiki.Can't find configuration file _joplin-blog_json"),
      )
      return false
    }
    return (await readJson(configPath)) as JoplinBlogConfig
  }

  async main() {
    console.log(await figletPromise('joplin-blog'))
    const config = await this.checkConfig()
    if (!config) {
      return
    }
    await i18n.load(config.language || (await i18n.getLanguage()))
    const application = await BlogCommanderProgram.getBlogApplication(config)
    await this.gen(application)
  }

  async gen(app: Application) {
    const checkInfo = await app.check()
    if (checkInfo !== true) {
      console.error(i18n.t('wiki.Failed to test joplin service: '), checkInfo)
      return
    }
    const spinner = ora({
      color: 'blue',
    })

    spinner.start(i18n.t('wiki.Start filtering joplin notes'))
    const arr = await app.filter()
    if (arr.length === 0) {
      spinner.warn(i18n.t('wiki.No notes to be processed')).stopAndPersist()
      return
    }
    spinner.stopAndPersist({
      text: i18n.t(`blog.Filter to get {{length}} notes to be processed`, {
        length: arr.length,
      }),
    })

    spinner.start(i18n.t('wiki.Start reading note attachments and tags'))
    const noteList = await app
      .readNoteAttachmentsAndTags(arr)
      .on('process', (options) => {
        spinner.text = i18n.t(
          'blog.[{{rate}}/{{all}}] is reading note attachments and tags: {{title}}',
          options,
        )
      })
    spinner.text = i18n.t('wiki.End reading note attachments and tags')
    spinner.stopAndPersist()

    spinner.start(i18n.t('wiki.Start frame initialization action'))
    await app.handler.init()
    spinner.stopAndPersist({
      text: i18n.t('wiki.End frame initialization action'),
    })

    spinner.start(
      i18n.t(
        'blog.Start parsing the Joplin internal links and attachment resources in the notes',
      ),
    )
    const replaceContentNoteList = await app
      .parseAndWriteNotes(noteList)
      .on('process', (options) => {
        spinner.text = i18n.t(
          'blog.[{{rate}}/{{all}}] is parsing the Joplin internal links and attachment resources in the notes: {{title}}',
          options,
        )
      })
    spinner.stopAndPersist({
      text: i18n.t(
        'blog.End of parsing the Joplin internal links and attachment resources in the notes',
      ),
    })

    spinner.start(i18n.t('wiki.Start writing notes to a local file'))
    await app.writeNote(replaceContentNoteList).on('process', (options) => {
      spinner.text = i18n.t(
        'blog.{{rate}}/{{all}} Writing notes to local file: {{title}}',
        options,
      )
    })
    spinner.stopAndPersist({
      text: i18n.t('wiki.End writing notes to local file'),
    })

    spinner.start(i18n.t('wiki.Start copying attachment resources'))
    await app.copyResources(noteList).on('process', (options) => {
      spinner.text = i18n.t(
        'blog.{{rate}}/{{all}} Copying attachment resource: {{title}}',
        options,
      )
    })
    spinner.stopAndPersist({
      text: i18n.t('wiki.End Copying Attachment Resources'),
    })

    spinner.start().stopAndPersist({
      text: i18n.t('wiki.End generating wiki'),
    })
  }
}

/**
 * 之所以使用函数的形式是因为 i18n 必须先异步初始化
 */
export const wikiCommander = () =>
  new Command('wiki')
    .description(
      i18n.t(
        'wiki.Generate the files needed by the wiki based on the notes in Joplin',
      ),
    )
    .action(() => new BlogCommanderProgram().main())
