import * as React from 'react'

export interface RUploadProps {
  /**
   * @property {string} url URL to upload image
   */
  url: string

  /**
   * @property {string} viewUrl URL to load uploaded image 
   */
  viewUrl: string
  cropShape: 'round' | 'rect'
  label?: string
  initId?: string
  onChange?: (uploadedId: string) => void
}

declare const RUpload: React.FunctionComponent<RUploadProps>
export default RUpload