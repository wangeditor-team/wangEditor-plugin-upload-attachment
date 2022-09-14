# wangEditor 上传附件 插件

[English Documentation](./README-en.md)

## 介绍

[wangEditor](https://www.wangeditor.com/) 上传附件 插件。

![](./_img/demo.png)

## 安装

```shell
yarn add @wangeditor/plugin-upload-attachment
```

## 使用

【注意】该文档要求 `@wangeditor/editor` 版本 `>=5.1.16`

### 注册到编辑器

```js
import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(attachmentModule)
```

### 配置

编辑器配置

```ts
import { IEditorConfig } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {

  // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
  hoverbarKeys: {
    attachment: {
      menuKeys: ['downloadAttachment'], // “下载附件”菜单
    },
  },
  MENU_CONF: {
    // “上传附件”菜单的配置
    uploadAttachment: {
      server: '/api/upload', // 服务端地址
      timeout: 5 * 1000, // 5s

      fieldName: 'custom-fileName',
      meta: { token: 'xxx', a: 100 }, // 请求时附加的数据
      metaWithUrl: true, // meta 拼接到 url 上
      headers: { Accept: 'text/x-json' },

      maxFileSize: 10 * 1024 * 1024, // 10M

      onBeforeUpload(file: File) {
        console.log('onBeforeUpload', file)
        return file // 上传 file 文件
        // return false // 会阻止上传
      },
      onProgress(progress: number) {
        console.log('onProgress', progress)
      },
      onSuccess(file: File, res: any) {
        console.log('onSuccess', file, res)
      },
      onFailed(file: File, res: any) {
        alert(res.message)
        console.log('onFailed', file, res)
      },
      onError(file: File, err: Error, res: any) {
        alert(err.message)
        console.error('onError', file, err, res)
      },

      // // 上传成功后，用户自定义插入文件
      // customInsert(res: any, file: File, insertFn: Function) {
      //   console.log('customInsert', res)
      //   const { url } = res.data || {}
      //   if (!url) throw new Error(`url is empty`)

      //   // 插入附件到编辑器
      //   insertFn(`customInsert-${file.name}`, url)
      // },

      // // 用户自定义上传
      // customUpload(file: File, insertFn: Function) {
      //   console.log('customUpload', file)

      //   return new Promise(resolve => {
      //     // 插入一个文件，模拟异步
      //     setTimeout(() => {
      //       const src = `https://www.w3school.com.cn/i/movie.ogg`
      //       insertFn(`customUpload-${file.name}`, src)
      //       resolve('ok')
      //     }, 500)
      //   })
      // },

      // // 自定义选择
      // customBrowseAndUpload(insertFn: Function) {
      //   alert('自定义选择文件，如弹出图床')
      //   // 自己上传文件
      //   // 上传之后用 insertFn(fileName, link) 插入到编辑器
      // },

      // 插入到编辑器后的回调
      onInsertedAttachment(elem: AttachmentElement) {
        console.log('inserted attachment', elem)
      },
    },
  },

  // 其他...
}
```

工具栏配置

```ts
import { IToolbarConfig } from '@wangeditor/editor'

const toolbarConfig: Partial<IToolbarConfig> = {
  // 插入哪些菜单
  insertKeys: {
    index: 0, // 自定义插入的位置
    keys: ['uploadAttachment'], // “上传附件”菜单
  },

  // 其他...
}
```

然后创建编辑器和工具栏，会用到 `editorConfig` 和 `toolbarConfig` 。具体查看 wangEditor 文档。

### 服务端返回格式

成功

```json
{
  "errno": 0,
  "data": {
    "url": "附件的下载链接"
  }
}
```

失败（会触发 `onFailed` 函数）

```json
{
  "errno": 1,
  "message": "错误信息"
}
```

### 显示 HTML

附件节点获取的 HTML 格式如下，可以直接显示。

```html
<a data-w-e-type="attachment" data-w-e-is-void data-w-e-is-inline href="https://xxx.com/aaa/bbb/xxx.zip" download="xxx.zip">xxx.zip</a>
```

## 其他

支持 i18n 多语言
