/**
 * @description parse elem html
 * @author wangfupeng
 */

import { DOMElement } from '../utils/dom'
import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { AttachmentElement } from './custom-types'

function parseHtml(
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement {
  const link = elem.getAttribute('data-link') || ''
  const fileName = elem.getAttribute('data-fileName') || ''
  return {
    type: 'attachment',
    link,
    fileName,
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as AttachmentElement
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="attachment"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
