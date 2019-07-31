---
extend: '@vue/cli-service/generator/template/vue.config.js'
replace:
  - !!js/regexp /\.{3}buildConfig\(\),/
  - !!js/regexp /const\sbuildConfig\s=\srequire("\.\/\.fe\-h5\.js");/
---

<%# REPLACE %>
...buildConfig()
<%# END_REPLACE %>

<%_ if (!hasVueConfig) { _%>
  module.exports = {
    ...buildConfig(),
  };
<%_ } _%>
