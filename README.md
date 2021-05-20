> Migrate to [joplin-utils](https://github.com/rxliuli/joplin-utils/)

# joplin-blog

## Introduction

CLI tool to publish Joplin notes as a static website, currently supports both blog/wiki forms, framework supports
hexo/vuepress/docsify.

- blog
  - [hexo](https://rxliuli.com/joplin-blog/blog/hexo/)
  - [vuepress](https://rxliuli.com/joplin-blog/blog/vuepress/)
- wiki
  - [vuepress](https://rxliuli.com/joplin-blog/wiki/vuepress/p/947da6a714854075af6e07835de4a719.html)
  - [docsify](https://rxliuli.com/joplin-blog/wiki/docsify/#/p/947da6a714854075af6e07835de4a719)

![blog demo](docs/blog.png)
![wiki demo](docs/wiki.png)

## Requirements

- Install nodejs and yarn
- Knowledge of command line
- Understanding VSCode

## Use

1. Navigate to the relevant directory at the command line
2. Add dependencies `yarn add -D joplin-blog`.
3. add a configuration file `.joplin-blog.json` (see [configuration](#configuration) for details)
4. add an npm script file `"gen": "joplin-blog blog"` (if you want to generate a wiki then `"gen": "joplin-blog wiki"`)
5. Run the command `yarn gen` 6.
6. Then you can see that the relevant directory already contains the notes and attached resources

## examples

The supported frameworks have examples in the examples directory, which you can clone locally to see.

- [blog hexo](https://github.com/rxliuli/joplin-blog/tree/master/examples/blog-hexo-example)
- [blog vuepress](https://github.com/rxliuli/joplin-blog/tree/master/examples/blog-vuepress-example)
- [wiki vuepress](https://github.com/rxliuli/joplin-blog/tree/master/examples/wiki-vuepress-example)
- [wiki docsify](https://github.com/rxliuli/joplin-blog/tree/master/examples/wiki-docsify-example)

## Configuration

public

| configuration       | type                    | description                                            |
| ------------------- | ----------------------- | ------------------------------------------------------ |
| `type`              | `hexo/vuepress/docsify` | type of integrated blog                                |
| `rootPath`          | `string`                | hexo/vuepress directory, which should normally be `. ` |
| `joplinProfilePath` | `string`                | joplin personal folder                                 |
| `token`             | `string`                | joplin web clipper's token                             |
| `port`              | `number`                | the port of the joplin web clipper, usually `41184`    |
| `tag`               | `string`                | joplin's blog tag                                      |

hexo

| configuration     | type       | description                 |
| ----------------- | ---------- | --------------------------- |
| `stickyTopIdList` | `string[]` | topped notes id (only works |

under [fluid topics](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/README_en.md) (only works
under [fluid topics]()) |

I've shared over 170 notes with this tool, [blog address (Chinese)](https://blog.rxliuli.com/)

## FAQ

### What does token/port refer to and where can I find it?

You can usually see it in **Tools > Options > Web Clipper**

! [joplin web clipper](https://img.rxliuli.com/20210316092547.png)

### Where is the joplin personal folder?

Generally speaking, if you are using a portable program, it should be in the program directory in the `. /JoplinProfile`
directory, and you should see the `resources, templates, tmp` directory in there.

! [joplinProfilePath](https://img.rxliuli.com/20210316092834.png)
