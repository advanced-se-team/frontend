const express = require('express');

const app = express();

const history = require('connect-history-api-fallback');

// 重定向到index.html
history({
  rewrites: [{
    from: /^\/libs\/.*$/,
    to: '/index.html',
  }],
});

app.use(history());

app.use(express.static('./dist'));

app.listen('8088', () => {
  console.log('服务器启动 http://localhost:8088');
});
