import * as React from 'react'

export interface RUploadProps {
  
  // URL to upload image
  url: string
  
  // URL to load uploaded image 
  viewUrl: string

  crop: boolean
  cropShape: 'round' | 'rect'
  label?: string
  initId?: string
  onChange?: (uploadedId: string) => void
}

declare const RUpload: React.FunctionComponent<RUploadProps>
export default RUpload