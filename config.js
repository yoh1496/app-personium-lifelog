module.exports = {
  personium: {
    CELL_NAME: 'app-personium-lifelog',
    CELL_FQDN: 'app-personium-lifelog.ohesonium.mydns.jp',
    CELL_ADMIN: process.env.PERSONIUM_USER,
    CELL_ADMIN_PASS: process.env.PERSONIUM_PASS,
    DIRECTORY_MAPPING: [
      {
        filePattern: [
          'src/app/engine/front/*',
          '!src/app/engine/**/*.example.*',
        ],
        srcDir: 'src/app/engine/front',
        dstDir: 'front',
        resourceType: 'service',
        meta: {
          language: 'JavaScript',
          subject: 'tokenAcc',
          endPoints: {
            app: 'launchSPA.js',
          },
        },
      },
      {
        filePattern: [
          'src/app/engine/webhook/*',
          '!src/app/engine/**/*.example.*',
        ],
        srcDir: 'src/app/engine/webhook',
        dstDir: 'webhook',
        resourceType: 'service',
        meta: {
          language: 'JavaScript',
          subject: 'tokenAcc',
          endPoints: {
            slack: 'slack.js',
          },
        },
      },
      {
        filePattern: [
          'src/app/engine/slack/*',
          '!src/app/engine/slack/*.example.*',
        ],
        srcDir: 'src/app/engine/slack',
        dstDir: 'slack',
        resourceType: 'service',
        meta: {
          language: 'JavaScript',
          subject: 'tokenAcc',
          endPoints: {
            register: 'register.js',
            start_oauth: 'start_oauth.js',
            events: 'events.js',
            interactions: 'interactions.js',
            authentication_done: 'authentication_done.js',
          },
        },
      },

      {
        filePattern: [
          'src/app/engine/debugging/*',
          '!src/app/engine/**/*.example.*',
        ],
        srcDir: 'src/app/engine/debugging',
        dstDir: 'debugging',
        resourceType: 'service',
        meta: {
          language: 'JavaScript',
          subject: 'tokenAcc',
          endPoints: {
            getEventListenerToken: 'getEventListenerToken.js',
          },
        },
      },

      {
        filePattern: [
          'src/app/public',
          'src/app/public/**/*',
          '!src/app/public/**/*.example.*',
        ],
        srcDir: 'src/app/public',
        dstDir: 'public',
        resourceType: 'collection',
      },
      {
        filePattern: ['src/assets/**/*', '!src/assets/**/*.example.*'],
        srcDir: 'src/assets',
        dstDir: '',
        resourceType: 'staticFile',
      },
    ],
  },
  network: {
    http_proxy: process.env.http_proxy || '',
    https_proxy: process.env.https_proxy || '',
  },
};

process.env.http_proxy = '';
process.env.https_proxy = '';
process.env.HTTP_PROXY = '';
process.env.HTTPS_PROXY = '';

console.log('------------------------------------------------------');
console.log(' <info>');
console.log('   Proxy env values are contained in `config.network` ');
console.log('------------------------------------------------------');
