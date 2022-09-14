# Dev doc

## 主要目录

- `src` 源代码
- `test` 单元测试
- `example` 本地测试 demo ，不用于 build
- `build` 打包配置

## dev 本地运行

`yarn dev` 启动本地服务，**使用 example 目录**。

PS：需启动 https://github.com/wangeditor-team/server 创建一个服务端，提供上传接口

## 单元测试

`yarn test` 单元测试，使用 test 目录。

## build 构建

`yarn build` 构建代码，**使用 src 目录**。

## release 发布

第一，升级 package.json 版本

第二，提交 git tag 可触发 github actions 并发布 npm

```sh
git tag -a v0.0.1 -m "v0.0.1"  # 和 package.json 版本同步即可
git push origin --tags
```

## 注意事项

package.json
- 定义 `"main": "dist/index.js"`
- 定义 `"module": "dist/index.js"`
- 定义 `"types": "dist/src/index.d.ts"`
- `@wangeditor/editor` 不要安装在 `dependencies` ，否则用户安装时也会安装它们

webpack 配置
- 定义 `library`
- 定义 `externals` ，构建时忽略 `@wangeditor/editor` ，否则体积会很大
