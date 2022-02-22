/**
 * @description download attachment menu test
 * @author wangfupeng
 */

import { SlateEditor, IDomEditor } from '@wangeditor/editor'
import createEditor from '../../utils/create-editor'
import { AttachmentElement } from '../../../src/index'
import DownloadAttachmentMenu from '../../../src/module/menu/DownloadAttachment'
import withAttachment from '../../../src/module/plugin'

describe('download attachment menu', () => {
  let editor = withAttachment(createEditor())
  const menu = new DownloadAttachmentMenu()

  function getStartLocation(editor: IDomEditor) {
    return SlateEditor.start(editor, [])
  }

  function genAttachmentElem() {
    const attachmentElem: AttachmentElement = {
      type: 'attachment',
      fileName: 'aaa',
      link: 'bbb',
      children: [{ text: '' }],
    }
    return attachmentElem
  }

  beforeEach(() => {
    editor = withAttachment(createEditor())
  })

  it('getValue', () => {
    // 选中空编辑器
    editor.select(getStartLocation(editor))
    expect(menu.getValue(editor)).toBe('')

    // 选中 attachment 节点
    editor.insertNode(genAttachmentElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.getValue(editor)).toBe('bbb') // value 即 elem.link
  })

  it('isActive', () => {
    expect(menu.isActive(editor)).toBe(false)
  })

  it('isDisabled', () => {
    // 选中空编辑器
    editor.select(getStartLocation(editor))
    expect(menu.isDisabled(editor)).toBeTruthy()

    // 选中 attachment 节点
    editor.insertNode(genAttachmentElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.isDisabled(editor)).toBeFalsy()
  })
})
