/**
 * @description parse elem html test
 * @author wangfupeng
 */

import createEditor from '../utils/create-editor'
import parseHtmlConf from '../../src/module/parse-elem-html'
import { AttachmentElement } from '../../src/index'

describe('parse elem html', () => {
  const editor = createEditor()

  it('selector', () => {
    expect(parseHtmlConf.selector).toBe('span[data-w-e-type="attachment"]')
  })

  it('parse html', () => {
    const link = 'aaa'
    const fileName = 'bbb'
    // elem-to-html 产出的 html 格式： <span data-w-e-type="attachment" data-w-e-is-void data-w-e-is-inline data-link="${link}" data-fileName="${fileName}">${fileName}</span>
    const elem = document.createElement('span')
    elem.setAttribute('data-w-e-type', 'attachment')
    elem.setAttribute('data-link', link)
    elem.setAttribute('data-fileName', fileName)

    const attachment = parseHtmlConf.parseElemHtml(elem, [], editor) as AttachmentElement
    expect(attachment.type).toBe('attachment')
    expect(attachment.link).toBe(link)
    expect(attachment.fileName).toBe(fileName)
  })
})
