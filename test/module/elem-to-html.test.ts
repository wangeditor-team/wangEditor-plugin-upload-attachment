/**
 * @description elem to html test
 * @author wangfupeng
 */

import elemToHtmlConf from '../../src/module/elem-to-html'
import { AttachmentElement } from '../../src/index'

describe('attachment elem-to-html', () => {
  const fileName = 'xxx.zip'
  const link = 'https://pan.baidu.com/'
  const attachmentElem: AttachmentElement = {
    type: 'attachment',
    fileName,
    link,
    children: [{ text: '' }],
  }

  it('type', () => {
    expect(elemToHtmlConf.type).toBe('attachment')
  })

  it('elem to html', () => {
    const html = elemToHtmlConf.elemToHtml(attachmentElem, '')
    expect(html).toBe(
      `<span data-w-e-type="attachment" data-w-e-is-void data-w-e-is-inline data-link="${link}" data-fileName="${fileName}">${fileName}</span>`
    )
  })
})
