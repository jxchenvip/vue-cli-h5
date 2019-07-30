---
extend: '@vue/cli-service/generator/template/config/index.js'
replace:
- !!js/regexp /\s*const\sbuildConfig\s=\srequire\(.+\);/
- !!js/regexp /\s*\.\.\.buildConfig\(\),/
- !!js/regexp /module.exports/
- !!js/regexp /bundleAnalyzerReport/
---

<%# REPLACE %><%# END_REPLACE %>
<%# REPLACE %><%# END_REPLACE %>


<%# REPLACE %>const buildConfig = require('../.fe-h5.js');
module.exports
<%# END_REPLACE %>


<%# REPLACE %>
...buildConfig(),
bundleAnalyzerReport
<%# END_REPLACE %>