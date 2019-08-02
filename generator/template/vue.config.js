<% if (!hasVueConfig) { %>
/** 默认预设 */
const preconfig = {
  dev: {
    publicPath: '/',
  },
  test108: {
    publicPath: '/',
  },
  test109: {
    publicPath: '/',
  },
  staging: {
    publicPath: '/',
  },
  release: {
    publicPath: '/',
  },
};

const vueconfig = require('./.feh5.js')(preconfig);

module.exports = {
  ...vueconfig,
};
<% } %>
  
