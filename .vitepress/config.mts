import { defineConfig } from 'vitepress';
import { parseTime } from '../src/utils/common';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "代码随想录",
  description: "个人在线编程学习笔记",
  srcDir: 'src',
  base: '/', // 部署站点的基础路径，默认值为根目录 '/',如果打算将站点部署到 https://foo.github.io/bar/，则将此值改为 '/bar/'。
  head: [
    ['link', { rel: 'icon', href: '/logo/logo-mini.svg' }]
  ],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo/logo-mini.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '后端', link: '/notes/backend/java/' },
      { text: '前端', link: '/notes/frontend/html/' },
      { text: '工程化', link: '/notes/engineering/git/' },
      { text: '运维', link: '/notes/dev-ops/linux/' },
      // {
      //   text: '示例',
      //   link: '/notes/example/markdown-examples'
      // }
    ],
    sidebar: {
      '/notes/backend/': [
        { text: 'Java基础', link: '/notes/backend/java/' },
        { text: 'Python基础', link: '/notes/backend/python/' },
      ],
      '/notes/frontend/': [
        { text: 'HTML', link: '/notes/frontend/html/' },
        { text: 'CSS', link: '/notes/frontend/css/' },
        { text: 'JavaScript', link: '/notes/frontend/js/' },
        { text: 'TypeScript', link: '/notes/frontend/ts/' },
      ],
      '/notes/engineering/': [
        {
          text: 'Git',
          items: [
            {
              text: '第一章：Git概述',
              link: '/notes/engineering/git/git-overview.md'
            },
            {
              text: '第二章：Git安装与配置',
              link: '/notes/engineering/git/git-install.md'
            },
            {
              text: '第三章：Git常用命令',
              link: '/notes/engineering/git/git-command.md'
            },
            {
              text: '第四章：Git分支管理',
              link: '/notes/engineering/git/git-branch.md'
            },
            {
              text: '第五章：Git团队协作机制',
              link: '/notes/engineering/git/git-team.md'
            },
            {
              text: '第六章：Github操作',
              link: '/notes/engineering/git/git-github.md'
            },
            {
              text: '第七章：IDEA集成 Git',
              link: '/notes/engineering/git/git-idea.md'
            },
            {
              text: '第八章：IDEA集成Github',
              link: '/notes/engineering/git/git-idea-github.md'
            },
            {
              text: '第九章：Gitee操作',
              link: '/notes/engineering/git/git-gitee.md'
            },
            {
              text: '第十章：GitLab操作',
              link: '/notes/engineering/git/git-gitlab.md'
            }
          ]
        },
        {
          text: 'Maven',
          items: [
            {
              text: 'Maven多模块版本号管理',
              link: '/notes/engineering/maven/maven-multi-module-version-management.md'
            },
            {
              text: 'Maven多模块中build全局配置',
              link: '/notes/engineering/maven/maven-multi-module-build-global-config.md'
            },
            {
              text: 'Maven插件repackage配置',
              link: '/notes/engineering/maven/maven-plugin-repackage-config.md'
            },
          ]
        }
      ],
      '/notes/dev-ops/': [
        { text: 'Linux', link: '/notes/dev-ops/linux/' },
        { text: 'Nginx', link: '/notes/dev-ops/nginx/' },
      ],
      // '/notes/example/': [
      //   { text: 'Markdown示例', link: '/notes/example/markdown-examples' },
      //   { text: 'Api示例', link: '/notes/example/api-examples' },
      // ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wk-cloud' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5.5 3.5h7l5 5v12h-12v-17Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12.5 3.5v5h5M8.5 12h6M8.5 15.5h6"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m14.5 5.5 6-0.1M20.5 5.4v6M20.5 5.4l-6 6"/></svg>'
        },
        link: 'https://wk-blog.vip',
      },
    ],
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '切换主题',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    outline: {
      label: '目录',
      level: [1, 6]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${parseTime('2026-08-28', '{y}')}-${parseTime(new Date(), '{y}')} wk`
    },
    lastUpdated: {
      text: '最后更新时间',
    },
    returnToTopLabel: '回到顶部',
  },
  markdown: {
    lineNumbers: true
  }
})
