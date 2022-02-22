/**
 * @description attachment local test
 * @author wangfupeng
 */

import '../../src/module/local'
import { i18nChangeLanguage, t } from '@wangeditor/editor'

describe('local', () => {
  it('zh-CN', () => {
    expect(t('attachment.upload')).toBe('上传附件')
  })
  it('en', () => {
    i18nChangeLanguage('en')
    expect(t('attachment.upload')).toBe('Upload Attachment')
  })
})
