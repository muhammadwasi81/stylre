import { useState, useEffect } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createProductAction } from '../features/product/productSlice'
import { reset } from '../features/payment/paymentSlice'

const ProductInfo = () => {
  const dispatch = useDispatch()
  const [previewImg, setPreviewImg] = useState('')
  const { isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.product
  )
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    quantity: '',
    color: '',
    address: '',
    productName: '',
    image: '',
  })
  const { firstName, lastName, quantity, color, address, productName, image } =
    formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const requiredFields = [
    firstName,
    lastName,
    quantity,
    color,
    address,
    productName,
    image,
  ]
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Product created successfully')
      setFormData({
        firstName: '',
        lastName: '',
        quantity: '',
        color: '',
        address: '',
        productName: '',
        image: '',
      })
    }
    dispatch(reset())
  }, [dispatch, isLoading, isError, isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    if (requiredFields.includes('')) {
      return toast.error('Please fill in all fields')
    }
    dispatch(createProductAction(formData))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    console.log(reader, 'reader')
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }))
    }
  }
  return (
    <Layout title="Product Info">
      <section className="container customerWrapper">
        {isLoading && <Loader />}
        <h1 className="fw-bold">Product Info</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              placeholder="Enter your quantity"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
              value={color}
              placeholder="Enter your product color"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={address}
              placeholder="Enter your address"
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="productName"
              name="productName"
              value={productName}
              placeholder="Enter your product name"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-5">
            {isLoading ? 'Loading...' : 'Create Delivery'}
          </button>
        </form>
      </section>
    </Layout>
  )
}

export default ProductInfo
