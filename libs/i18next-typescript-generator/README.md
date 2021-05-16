# i18next-typescript-generator

## 简介

i18next 的 typescript 类型定义生成器，可以从多个语言翻译 json 文件中生成类型定义，支持嵌套对象与参数。

## 动机

为什么已经有了很多第三方的类型定义生成器，甚至最新版 i18next 官方已经推出了 typescript 解决方案，吾辈还要写这个呢？

简而言之，都不完善。

先从 i18next 官方的解决方案说起，它是将 json 文件替换为 ts 文件，但不能支持参数和嵌套对象。

Pass: 最新版似乎利用了 typescript 4.2 的递归类型和模板字符串类型来保证类型安全，但这实际上是不怎么好用的。另外只有 react-i18next 是可用的。

> 参考：
>
> - [i18next typescript support](https://react.i18next.com/latest/typescript)
> - [StackOverflow i18next 的类型定义](https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript/58308279#58308279)

再来说 [i18next-typescript](https://github.com/LFDM/i18next-typescript) 这个第三方库，几乎能满足吾辈的需求了，除了一点：支持对象参数。

另外，就吾辈而言，认为使用生成器生成简单的类型要比从类型系统上支持这种功能更加容易，也更加合理。
