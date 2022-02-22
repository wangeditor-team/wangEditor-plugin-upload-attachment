/**
 * @description render-elem test
 * @author wangfupeng
 */

import createEditor from '../utils/create-editor'
import renderElemConf from '../../src/module/render-elem'
import { AttachmentElement } from '../../src/index'

describe('attachment render-elem', () => {
  const editor = createEditor()

  const fileName = 'xxx.zip'
  const attachmentElem: AttachmentElement = {
    type: 'attachment',
    fileName,
    link: 'a',
    children: [{ text: '' }],
  }

  it('type', () => {
    expect(renderElemConf.type).toBe('attachment')
  })

  it('render elem', () => {
    const vnode = renderElemConf.renderElem(attachmentElem, null, editor) as any
    expect(vnode.sel).toBe('span')
    expect(vnode.data.props.contentEditable).toBe(false)

    const children = vnode.children || []
    expect(children[0].sel).toBe('img')
    expect(children[1].text).toBe(fileName)
  })
})
