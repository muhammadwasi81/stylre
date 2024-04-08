import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0])
  }

  const handleUpload = async () => {
    try {
      if (!selectedImage) {
        return toast.error('Please select an image.')
      }

      const formData = new FormData()
      formData.append('file', selectedImage)
      formData.append('upload_preset', 'zc34cyfz')
      formData.append('cloud_name', 'nextjs-amazona-wasi')

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/nextjs-amazona-wasi/upload',
        formData
      )
      console.log(response.data.secure_url, 'image url')
      const imageUrl = response.data.secure_url
      onImageUpload(imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image.')
    }
  }

  return (
    <div className="form-group">
      <label htmlFor="fileInput" className="form-label text-black fw-bolder">
        Upload Image
      </label>
      <input
        type="file"
        className="form-control"
        id="fileInput"
        onChange={handleImageChange}
      />
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload Image
      </button>
    </div>
  )
}

export default ImageUploader
