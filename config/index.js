const addSlash = function(path) {
  return path.charAt(0) === '/' ? path : `/${path}`
}

module.exports = {
  meta: {
    // site
    // siteTitle: '兔脚の新大陆',
    siteTitle: '幸运的兔脚',
    shortSiteTitle: '幸运兔脚',
    siteDescription: "RabbitFeet's Hobby Blog",
    siteUrl: 'http://localhost:9000/',
    siteLanguage: 'zh-CN',

    // author
    authorName: '兔脚',

    // manifest.json
    manifestName: '幸运的兔脚',
    manifestShortName: '幸运兔脚',
    manifestStartUrl: '/',
    manifestBackgroundColor: '#fff',
    manifestThemeColor: '#2c3e50',
    manifestDisplay: 'minimal-ui',

    // twitter card
    twitterName: 'LuckyRabbitFeet',

    // google analytics
    trackingId: 'UA-127771142-2',
  },

  gitalk: {
    clientID: 'e8d900477e6141815203',
    clientSecret: 'ba0c2a39792ba684150e11d8b79207e653c58b3f',
    repo: 'rabbitfeet.net',
    owner: 'LuckyRabbitFeet',
    admin: ['LuckyRabbitFeet'],
  },

  navigation: [
    {
      name: '首页',
      path: '/',
    },
    {
      name: '关于',
      path: '/about',
    },
  ],

  navPath: function(root = '/', path = '') {
    switch (root) {
      case 'art':
        return `/archives${addSlash(path)}`
      case 'cat':
        return `/category${addSlash(path)}`
      case 'tag':
        return `/tags${addSlash(path)}`
      case '/':
      default:
        return addSlash(path)
    }
  },

  category: {
    code: {
      name: '代码',
      color: '#ff5252',
    },
    essay: {
      name: '随笔',
      color: '#fb8c00',
    },
    acg: {
      name: 'ACG',
      color: '#7c4dff',
    },
    repro: {
      name: '转载',
      color: '#6d4c41',
    },
    mis: {
      name: '杂记',
      color: '#448aff',
    },
    other: {
      name: '其他',
      color: '#424242',
    },
  },
}
