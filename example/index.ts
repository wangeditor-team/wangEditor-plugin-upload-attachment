/**
 * @description examples entry
 * @author wangfupeng
 */

import { createEditor, createToolbar, Boot, i18nChangeLanguage } from '@wangeditor/editor'
// import module from '../src/index'
import '../src/index'

// Boot.registerModule(module)

// i18nChangeLanguage('en')

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: {
    onChange(editor) {
      const html = editor.getHtml()
      // @ts-ignore
      document.getElementById('text-html').value = html
      const contentStr = JSON.stringify(editor.children, null, 2)
      // @ts-ignore
      document.getElementById('text-json').value = contentStr
    },
  },
  html: `<p>hello&nbsp;world</p><p><br></p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {},
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
