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
      { text: '后端', link: '/views/backend/java/' },
      { text: '前端', link: '/views/frontend/html/' },
      { text: '工程化', link: '/views/engineering/git/' },
      { text: '运维', link: '/views/dev-ops/linux/' },
      // {
      //   text: '示例',
      //   link: '/views/example/markdown-examples'
      // }
    ],
    sidebar: {
      '/views/backend/': [
        { text: 'Java基础', link: '/views/backend/java/' },
        { text: 'Python基础', link: '/views/backend/python/' },
      ],
      '/views/frontend/': [
        { text: 'HTML', link: '/views/frontend/html/' },
        { text: 'CSS', link: '/views/frontend/css/' },
        { text: 'JavaScript', link: '/views/frontend/js/' },
        { text: 'TypeScript', link: '/views/frontend/ts/' },
      ],
      '/views/engineering/': [
        { text: 'Git', link: '/views/engineering/git/' }
      ],
      '/views/dev-ops/': [
        { text: 'Linux', link: '/views/dev-ops/linux/' },
        { text: 'Nginx', link: '/views/dev-ops/nginx/' },
      ],
      // '/views/example/': [
      //   { text: 'Markdown示例', link: '/views/example/markdown-examples' },
      //   { text: 'Api示例', link: '/views/example/api-examples' },
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
