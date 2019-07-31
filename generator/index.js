module.exports = (api, projectOptions) => {
  api.extendPackage({
    scripts: {
      "build:dev": "DEPLOY_ENV=dev npm run build",
      "build:release": "DEPLOY_ENV=release npm run build",
      "build:staging": "DEPLOY_ENV=staging npm run build",
      "build:test108": "DEPLOY_ENV=test108 npm run build",
      "build:test109": "DEPLOY_ENV=test109 npm run build"
    }
  });
  api.render("./template", { name: api.generator.pkg.name });
};
