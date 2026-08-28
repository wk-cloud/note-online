import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "代码随想录",
  description: "个人在线编程学习笔记",
  srcDir: 'src',
  base: '/', // 部署站点的基础路径，默认值为根目录 '/',如果打算将站点部署到 https://foo.github.io/bar/，则将此值改为 '/bar/'。
  head: [
    ['link', { rel: 'icon', href: '/assets/logo/logo-mini.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/logo/logo-mini.svg',
    nav: [
      { text: '主页', link: '/' },
      { text: '后端', link: '/views/backend/java/index' },
      { text: '前端', link: '/views/frontend/html/index' },
      { text: '工程化', link: '/views/engineering/git/index' },
      { text: '运维', link: '/views/dev-ops/nginx/index' },
      // {
      //   text: '示例',
      //   link: '/views/example/markdown-examples'
      // }
    ],
    sidebar: {
      '/views/backend/': [
        { text: 'Java基础', link: '/views/backend/java/index' },
        { text: 'Python基础', link: '/views/backend/python/index' },
      ],
      '/views/frontend/': [
        { text: 'HTML', link: '/views/frontend/html/index' },
        { text: 'CSS', link: '/views/frontend/css/index' },
        { text: 'JavaScript', link: '/views/frontend/js/index' },
      ],
      '/views/engineering/': [
        { text: 'Git', link: '/views/engineering/git/index' }
      ],
      '/views/dev-ops/': [
        { text: 'Nginx', link: '/views/dev-ops/nginx/index' },
      ],
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        }
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wk-cloud' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      label: '目录',
      level: [1, 6]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present wk'
    },
  }
})
