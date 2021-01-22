import * as React from 'react'

export interface UploadApi{
  reset: () => void
}

export interface RUploadProps {
  
  // URL to upload image
  url: string
  
  // URL to load uploaded image 
  viewUrl: string

  crop: boolean
  cropShape: 'round' | 'rect'
  label?: string
  initId?: string
  disabled: boolean
  onChange?: (uploadedId: string) => void
  uploadApi?: (uploadApi: UploadApi) => void
}

declare const RUpload: React.FunctionComponent<RUploadProps>
export default RUpload