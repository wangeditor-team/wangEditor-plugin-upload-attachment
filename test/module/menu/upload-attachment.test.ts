/**
 * @description upload attachment menu test
 * @author wangfupeng
 */

import { SlateEditor, IDomEditor } from '@wangeditor/editor'
import createEditor from '../../utils/create-editor'
import { AttachmentElement } from '../../../src/index'
import UploadAttachmentMenu from '../../../src/module/menu/UploadAttachment'
import withAttachment from '../../../src/module/plugin'

describe('upload attachment menu', () => {
  const editor = withAttachment(createEditor())
  const menu = new UploadAttachmentMenu()

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

  it('getValue', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  it('isActive', () => {
    expect(menu.isActive(editor)).toBe(false)
  })

  it('isDisabled', () => {
    // 选中空编辑器
    editor.select(getStartLocation(editor))
    expect(menu.isDisabled(editor)).toBeFalsy()

    // 选中 attachment 节点
    editor.insertNode(genAttachmentElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.isDisabled(editor)).toBeTruthy()
  })
})
