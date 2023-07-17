import { useState, useEffect } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify'
import { UUID, businessStores, pickUpAddress, storesData } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { createDeliveryAction, reset } from '../features/delivery/deliverySlice'

const DeliveryInfo = () => {
  const dispatch = useDispatch()
  const { deliveries, isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.delivery
  )
  console.log(deliveries, 'deliveries')

  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupPhoneNumber: '',
    pickupReferenceTag: '',
    dropOffAddress: '',
    dropOffBusinessName: '',
    dropOffPhoneNumber: '',
    orderValue: '',
    // tip: '',
  })

  const {
    pickupAddress,
    pickupPhoneNumber,
    pickupReferenceTag,
    dropOffAddress,
    dropOffBusinessName,
    dropOffPhoneNumber,
    orderValue,
    // tip,
  } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Delivery created successfully')
      setFormData({
        pickupAddress: '',
        pickupPhoneNumber: '',
        pickupReferenceTag: '',
        dropOffAddress: '',
        dropOffBusinessName: '',
        dropOffPhoneNumber: '',
        orderValue: '',
        tip: '',
      })
    }
    dispatch(reset())
  }, [dispatch, isSuccess, message, deliveries, isLoading])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const requiredFields = [
    pickupAddress,
    pickupPhoneNumber,
    pickupReferenceTag,
    dropOffAddress,
    dropOffBusinessName,
    dropOffPhoneNumber,
    orderValue,
    // tip,
  ]
  const onSubmit = (e) => {
    e.preventDefault()
    if (requiredFields.includes('')) {
      return toast.error('Please fill all the fields')
    }
    const deliveryData = {
      external_delivery_id: UUID(),
      pickup_address: pickupAddress,
      pickup_phone_number: pickupPhoneNumber,
      pickup_reference_tag: pickupReferenceTag,
      dropoff_address: dropOffAddress,
      dropoff_business_name: dropOffBusinessName,
      dropoff_phone_number: dropOffPhoneNumber,
      order_value: 200,
      // tip: tip,
    }
    console.log(deliveryData, 'payloadData')
    dispatch(createDeliveryAction(deliveryData))
    isSuccess &&
      setFormData({
        pickupAddress: '',
        pickupPhoneNumber: '',
        pickupReferenceTag: '',
        dropOffAddress: '',
        dropOffBusinessName: '',
        dropOffPhoneNumber: '',
        orderValue: '',
        tip: '',
      })
  }
  // order value will be calculated by location
  const getStorePhoneNumber = (storeName) => {
    console.log(storeName, 'storeName')
    const store = storesData.find((store) => store.name === storeName)
    return store ? store.phone : ''
  }
  return (
    <Layout title="Customer Info">
      <section className="container customerWrapper">
        <h1 className="fw-bold">Delivery Info</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="storePhoneNumber" className="form-label fw-bolder">
              Pickup Address
            </label>
            <select
              className="form-control"
              id="pickupAddress"
              name="pickupAddress"
              value={pickupAddress}
              placeholder="Additional Pickup"
              onChange={handleChange}
            >
              <option value="Select Pickup Address">
                Select Pickup Address
              </option>
              {pickUpAddress.map((address) => (
                <option key={address.id} value={address.address}>
                  {address.address}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="storePhoneNumber" className="form-label fw-bolder">
              Drop Off Address
            </label>
            <select
              className="form-control"
              id="dropOffAddress"
              name="dropOffAddress"
              value={dropOffAddress}
              placeholder="Select Pickup Business Store"
              onChange={handleChange}
            >
              <option value="">Select Pickup Business Store</option>
              {businessStores.map((store) => (
                <option key={store.id} value={store.name}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          {dropOffAddress && (
            <div className="form-group">
              <label
                htmlFor="storePhoneNumber"
                className="form-label fw-bolder"
              >
                Store Phone Number
              </label>
              <input
                type="text"
                className="form-control bg-transparent"
                id="storePhoneNumber"
                name="storePhoneNumber"
                value={getStorePhoneNumber(dropOffAddress)}
                disabled
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="storePhoneNumber" className="form-label fw-bolder">
              Customer Number
            </label>
            <input
              type="number"
              className="form-control"
              id="pickupPhoneNumber"
              name="pickupPhoneNumber"
              value={pickupPhoneNumber}
              placeholder="Enter customer number"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="storePhoneNumber" className="form-label fw-bolder">
              Drop Off Number
            </label>
            <input
              type="number"
              className="form-control"
              id="dropOffPhoneNumber"
              name="dropOffPhoneNumber"
              value={dropOffPhoneNumber}
              placeholder="Enter your drop off phone number"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="storePhoneNumber" className="form-label fw-bolder">
            Order Details
          </label>
          <div className="">
            <textarea
              className="text-area"
              id="pickupReferenceTag"
              name="pickupReferenceTag"
              value={pickupReferenceTag}
              placeholder="Enter Order Details"
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

export default DeliveryInfo
