/**
 * @description create editor
 * @author wangfupeng
 */

import { createEditor } from '@wangeditor/editor'

export default function (options: any = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  return createEditor({
    selector: container,
    ...options,
  })
}
