import { useState, useEffect } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createProductAction } from '../features/product/productSlice'
import { reset } from '../features/payment/paymentSlice'
import imageCompression from 'browser-image-compression'
import { productsData } from '../utils'
import Loader from '../components/Loader'

const ProductInfo = () => {
  const dispatch = useDispatch()
  const { isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.product
  )
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    quantity: '',
    products: '',
    image: '',
  })
  const { firstName, lastName, quantity, products, image } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleImageUpload = async (e) => {
    setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }))
  }

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
        products: '',
        image: '',
      })
    }
    dispatch(reset())
  }, [dispatch, isLoading, isError, isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()
    const formFields = [firstName, lastName, quantity, products, image]
    if (formFields.includes('')) {
      return toast.error('Please fill all the fields')
    }
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('quantity', quantity)
    formData.append('products', products)
    formData.append('image', image)
    dispatch(createProductAction(formData))
  }

  return (
    <Layout title="Product Info">
      <section className="container customerWrapper">
        <h1 className="fw-bold">Product Info</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label fw-bolder">
              First Name
            </label>
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
            <label htmlFor="lastName" className="form-label fw-bolder">
              Last Name
            </label>
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
            <label htmlFor="image" className="form-label fw-bolder">
              Choose image
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="form-label fw-bolder">
              Quantity
            </label>
            <select
              className="form-control"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
            >
              <option value="">Select quantity</option>
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="products" className="form-label fw-bolder">
              Product
            </label>
            <select
              className="form-control"
              id="products"
              name="products"
              value={products}
              onChange={handleChange}
            >
              <option value="">Select an item</option>
              {productsData.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-5">
            {isLoading ? <Loader /> : 'Create Product'}
          </button>
        </form>
      </section>
    </Layout>
  )
}

export default ProductInfo
