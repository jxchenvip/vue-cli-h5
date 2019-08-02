// fe-h5-fn-start
const fs = require("fs");
const chalk = require("chalk");

/**
 * 获取base url
 */
function getBaseurl() {
  const projectNameContext = fs.readFileSync("./projectName.conf", "utf8");
  const projectBaseName = projectNameContext.match(/PRONAME=(.*)(?=\n)?/);
  return projectBaseName ? projectBaseName[1].trim() : "";
}

/**
 * 构建分支信息
 */
function buildBranchInformation(res) {
  const { notes, ...others } = res;
  const { DEPLOY_ENV } = process.env;
  if (DEPLOY_ENV === undefined) {
    console.log(chalk.green(`【提示】: 可以布署到任意域名根目录下`));
    console.log(chalk.green(`【提示】: {assetsPublicPath: '/'}`));
  } else {
    console.log(chalk.green(`【发布分支为】: ${DEPLOY_ENV}分支`));
    console.log(chalk.green(`【布署环境为】: ${notes}`));
    console.log(chalk.green(`【build】: ${JSON.stringify(others)}`));
  }
  console.log(
    chalk.yellow(`【注意】检查projectName.conf中PRONAME是否与其他项目冲突`)
  );
}

/**
 * 合并对象
 * @param {*} target
 * @param {*} source
 */
function objectMerge(target, source) {
  const isObject = any =>
    Object.prototype.toString.call(any) === "[object Object]";
  const t = target;
  const loop = s => {
    for (const i in s) {
      if (!t[i]) {
        t[i] = s[i];
      } else if (isObject(t[i]) && isObject(s[i])) {
        objectMerge(t[i], s[i]);
      } else {
        t[i] = s[i];
      }
    }
    return t;
  };
  return loop(source);
}

/**
 * vue.config.js 配置
 * @param {*} config
 */
const vueconfig = (config = {}) => {
  const { DEPLOY_ENV: dv, NODE_ENV: nv } = process.env;
  console.log("DEPLOY_ENV: ", dv);
  if (nv !== "production") return {};
  const BASE_URL = getBaseurl();
  const maps = objectMerge(
    {
      dev: {
        notes: "开发环境",
        publicPath: "/"
      },
      test108: {
        notes: "测试服务器108",
        publicPath: "/"
      },
      test109: {
        notes: "测试服务器109",
        publicPath: "/"
      },
      staging: {
        notes: "预上线环境",
        publicPath: "/"
      },
      release: {
        notes: "正式环境",
        publicPath: "/"
      }
    },
    config
  );
  const res = maps[dv] ? maps[dv] : {};
  res.publicPath = `${res.publicPath}${BASE_URL}`;
  const { notes, ...others } = res;
  buildBranchInformation(res);
  return others;
};

module.exports = vueconfig;
