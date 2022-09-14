/**
 * @description examples entry
 * @author wangfupeng
 */

import {
  createEditor,
  createToolbar,
  Boot,
  IEditorConfig,
  i18nChangeLanguage,
} from '@wangeditor/editor'
import module, { AttachmentElement } from '../src/index'

Boot.registerModule(module)

// i18nChangeLanguage('en')

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  hoverbarKeys: {
    attachment: {
      menuKeys: ['downloadAttachment'], // “下载附件”菜单
    },
  },
  MENU_CONF: {
    // 上传附件的菜单配置
    uploadAttachment: {
      server: 'http://127.0.0.1:3000/api/upload-video', //一个文件地址
      timeout: 5 * 1000, // 5s

      fieldName: 'custom-fileName',
      meta: { token: 'xxx', a: 100 },
      metaWithUrl: true, // 参数拼接到 url 上
      headers: { Accept: 'text/x-json' },

      maxFileSize: 10 * 1024 * 1024, // 10M

      onBeforeUpload(file: File) {
        console.log('onBeforeUpload', file)
        return file // 返回哪些文件可以上传
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

      // // 用户自定义插入文件
      // customInsert(res: any, file: File, insertFn: Function) {
      //   console.log('customInsert', res)
      //   const { url } = res.data || {}
      //   if (!url) throw new Error(`url is empty`)

      //   // 自己插入附件
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
      // },

      onInsertedAttachment(elem: AttachmentElement) {
        console.log('inserted attachment', elem)
      },
    },
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  // content: [
  //   {
  //     type: 'paragraph',
  //     children: [
  //       { text: 'hello world' },
  //       {
  //         // @ts-ignore
  //         type: 'attachment',
  //         fileName: '附件文件名',
  //         link: 'https://pan.baidu.com/',
  //         children: [{ text: '' }],
  //       },
  //     ],
  //   },
  // {
  //   "type": "paragraph",
  //   "children": [
  //     {
  //       "text": " "
  //     },
  //     {
  //       "type": "link",
  //       "url": "http://localhost:8000/",
  //       "children": [
  //         {
  //           "text": "http://localhost:8000/"
  //         }
  //       ]
  //     },
  //     {
  //       "text": " "
  //     }
  //   ]
  // },
  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [{ text: '选一个视频文件，作为附件上传：' }],
  //   },
  // ],
  html: '<p>hello world<a data-w-e-type="attachment" data-w-e-is-void data-w-e-is-inline href="https://pan.baidu.com/" download="附件文件名">附件文件名</a></p><p> <a href="http://localhost:8000/" target="_blank">http://localhost:8000/</a> </p><p>选一个视频文件，作为附件上传：</p>',
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 0,
      keys: ['uploadAttachment'], // “上传附件”菜单
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
