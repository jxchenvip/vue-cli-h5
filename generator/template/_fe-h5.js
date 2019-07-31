// fe-h5-fn-start
const fs = require("fs");
const chalk = require("chalk");
const projectNameContext = fs.readFileSync("./projectName.conf", "utf8");
const projectBaseName = projectNameContext.replace(/PRONAME=(\w+)/, "$1");

const buildConfig = () => {
  const { DEPLOY_ENV, NODE_ENV } = process.env;
  console.log("DEPLOY_ENV: ", DEPLOY_ENV);
  if (NODE_ENV !== "production") return {};
  const maps = {
    dev: {
      notes: "开发环境",
      publicPath: `/${projectBaseName}`
    },
    test108: {
      notes: "测试服务器108",
      publicPath: `/${projectBaseName}`
    },
    test109: {
      notes: "测试服务器109",
      publicPath: `/${projectBaseName}`
    },
    staging: {
      notes: "预上线环境",
      publicPath: `/${projectBaseName}`
    },
    release: {
      notes: "正式环境",
      publicPath: `/${projectBaseName}`
    }
  };
  const res = maps[DEPLOY_ENV] ? maps[DEPLOY_ENV] : {};
  const { notes, ...others } = res;
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
  return others;
};
// fe-h5-fn-end

module.exports = buildConfig;
