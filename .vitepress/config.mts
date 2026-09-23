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
        {
          text: 'TypeScript',
          items: [
            {
              text: '第一章：快速入门',
              link: '/notes/frontend/ts/ts-quick-start.md'
            },
            {
              text: '第二章：面向对象编程',
              link: '/notes/frontend/ts/ts-oop.md'
            },
            {
              text: '第三章：高级特性',
              link: '/notes/frontend/ts/ts-advanced.md'
            },
            {
              text: '第四章：常见问题',
              link: '/notes/frontend/ts/ts-faq.md'
            }
          ]
        },
        {
          text: 'Vue',
          items: [
            {
              text: 'Vue性能优化',
              link: '/notes/frontend/vue/vue-performance-optimization.md'
            }
          ]
        }
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
          svg: '<svg t="1790156214931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3429" width="128" height="128"><path d="M494.198154 0c262.144 0 474.505846 212.361846 474.505846 474.505846s-212.361846 474.505846-474.505846 474.505846S19.692308 736.649846 19.692308 474.505846 232.054154 0 494.198154 0z m107.283692 437.563077c-0.315077-0.590769-0.472615-1.181538-0.787692-1.732923l-0.196923-0.393846a39.384615 39.384615 0 1 0-70.104616 35.84 67.741538 67.741538 0 0 1-14.020923 75.106461l-105.747692 105.944616a67.347692 67.347692 0 0 1-95.192615 0 67.347692 67.347692 0 0 1 0-95.153231l39.384615-39.424-0.275692-0.275692a39.384615 39.384615 0 1 0-54.784-56.280616l-0.118154-0.078769-40.172308 40.172308a146.116923 146.116923 0 0 0 0 206.76923 146.116923 146.116923 0 0 0 206.729846 0l106.06277-106.062769a146.195692 146.195692 0 0 0 29.223384-164.430769zM740.430769 235.835077a146.116923 146.116923 0 0 0-206.769231 0L427.677538 341.858462a146.235077 146.235077 0 0 0-29.341538 164.312615c0.275692 0.590769 0.472615 1.181538 0.787692 1.732923 0.078769 0.078769 0.078769 0.196923 0.157539 0.393846a39.384615 39.384615 0 1 0 70.104615-35.84 67.741538 67.741538 0 0 1 14.060308-75.145846l105.865846-105.865846a67.347692 67.347692 0 0 1 95.192615 0 67.347692 67.347692 0 0 1 0 95.192615l-39.424 39.424 0.275693 0.315077a39.384615 39.384615 0 1 0 54.823384 56.241231l0.07877 0.078769 40.172307-40.172308a146.313846 146.313846 0 0 0 0-206.76923z" fill="#666666" p-id="3430"></path></svg>'
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
