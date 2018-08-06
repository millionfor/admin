Pc Project

Base on (vue,vuex,vue-router,jquery)

### Setup

- 安装node > 8的LTS版本，https://nodejs.org/en/

- 增加npm本地仓库host，106.75.23.50 npm.analysys.cn

- 没安装yarn的，可以忽略以下yarn命令

```sh
# set registry
npm config set registry http://registry.npm.analysys.cn

# install dependencies
yarn | npm i

# startup development server (defaults to 9090)
# -> http://localhost:9090
yarn start | npm start
```

### Lint
```sh
yarn test | npm run test
yarn lint:fix | npm run lint:fix
```
