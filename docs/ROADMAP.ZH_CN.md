# 路线图

## 近期目标

- [ ] 实现从零生成一个与 joplin 关联的 blog 项目
- [ ] 使用户在不接触底层依赖框架的情况下完成导出、打包、部署操作
- [ ] 实现一个 wiki 生成器
  - [ ] 支持 docsify
  - [ ] 支持 vuepress
- [ ] 集成到 joplin 插件提供某种程度上的可视化界面

## 长期目标

- 定位于批处理工具，或许需要支持某种程度上的插件（有点类似于 joplin 插件，但相比之下完全通过 joplin data api 与之交互，更轻量，像是 user.js 与 chrome 插件之间的区别）
- 一些可行的批量处理功能
  - 在所有笔记中搜索并替换字符串
  - 更好的导入 markdown 目录，自动解析其中的附件资源本地文件
    - 导入 hexo 博客，解析 yaml 元数据并通过 api 写入 joplin，避免信息丢失
  - 检查从未使用的附件资源
  - 检查老旧的笔记
  - 检查内部引用笔记链接，将链接的文本重命名为笔记标题
  - 批量修改笔记的标签
  - 批量转换 .drawio => .drawio.svg
  - 批量转换 .km => .km.svg
  - 批量将外部链接的资源下载到 joplin 并作为内部附件资源
