import { useState, useEffect } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createProductAction } from '../features/product/productSlice'
import { reset } from '../features/payment/paymentSlice'
import Loader from '../components/Loader'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { barCodeInfo } from '../constants'

Modal.setAppElement('#root')
const ProductInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.product
  )
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    image: '',
  })
  const { firstName, lastName, image } = formData

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
        image: '',
      })
    }
    dispatch(reset())
  }, [dispatch, isLoading, isError, isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()
    const formFields = [firstName, lastName, image]
    if (formFields.includes('')) {
      return toast.error('Please fill all the fields')
    }
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
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
            <span className="form-label fw-bolder">Image</span>
            <label
              id="file-input-label"
              for="file-input"
              className="file-input-label"
            >
              Upload QR code
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              id="file-input"
              name="file-input"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => setModalIsOpen(true)}
            >
              ?
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Help Modal"
              style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  width: '500px',
                  height: '300px',
                  position: 'relative',
                },
                overlay: { zIndex: 1000 },
              }}
            >
              <button
                onClick={() => setModalIsOpen(false)}
                className="modal-close-btn"
              >
                <AiOutlineClose size={20} className="text-primary" />
              </button>
              <p>{barCodeInfo.info}</p>
            </Modal>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-5">
            {isLoading ? 'Loading...' : 'Create Product'}
          </button>
        </form>
      </section>
    </Layout>
  )
}

export default ProductInfo
