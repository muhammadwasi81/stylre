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
    pickup_address: '', // pickup address
    pickup_business_name: '', // pickup business name
    dropoff_phone_number: '', // customer number
    dropoff_instructions: '', // order details
    dropoff_address: '', // dropoff address
  })

  const {
    pickup_address,
    pickup_business_name,
    dropoff_phone_number,
    dropoff_instructions,
    dropoff_address,
  } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Delivery created successfully')
      setFormData({
        pickup_address: '', // pickup address
        pickup_business_name: '', // pickup business name
        dropoff_phone_number: '', // customer number
        dropoff_instructions: '', // order details
        dropoff_address: '', // dropoff address
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
    pickup_address,
    pickup_business_name,
    dropoff_phone_number,
    dropoff_instructions,
    dropoff_address,
  ]
  const onSubmit = (e) => {
    e.preventDefault()
    // if (requiredFields.includes('')) {
    //   return toast.error('Please fill all the fields')
    // }
    const deliveryData = {
      external_delivery_id: UUID(),
      pickup_address: '600 4th Ave, Seattle, WA 98101',
      pickup_business_name,
      dropoff_phone_number,
      dropoff_instructions,
      dropoff_address,
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
      <div className="delivery-wrapper">
        <h1 className="fw-bold text-black text-center">Delivery Info</h1>
        <section className="container d-flex justify-content-center">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label
                htmlFor="storePhoneNumber"
                className="form-label text-black fw-bolder"
              >
                Pick Up Address
              </label>
              <select
                className="form-control"
                id="pickup_address"
                name="pickup_address"
                value={pickup_address}
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
              <label
                htmlFor="storePhoneNumber"
                className="form-label  text-black fw-bolder"
              >
                Business Name
              </label>
              <select
                className="form-control"
                id="pickup_business_name"
                name="pickup_business_name"
                value={pickup_business_name}
                placeholder="Select Pickup Business Name"
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
            {/* {pickup_business_name && (
              <div className="form-group">
                <label
                  htmlFor="storePhoneNumber"
                  className="form-label text-black fw-bolder"
                >
                  Store Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dropoff_phone_number"
                  name="dropoff_phone_number"
                  value={getStorePhoneNumber(pickup_business_name)}
                  disabled
                />
              </div>
            )} */}
            {/* if not then remove it */}
            <div className="form-group">
              <label
                htmlFor="storePhoneNumber"
                className="form-label text-black fw-bolder"
              >
                Customer Number
              </label>
              <input
                type="number"
                className="form-control"
                id="dropoff_phone_number"
                name="dropoff_phone_number"
                value={dropoff_phone_number}
                placeholder="Enter customer number"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="storePhoneNumber"
                className="form-label text-black fw-bolder"
              >
                Drop Off Address
              </label>
              <input
                type="text"
                className="form-control"
                id="dropoff_address"
                name="dropoff_address"
                value={dropoff_address}
                placeholder="Enter your drop off Address"
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="storePhoneNumber"
              className="form-label  text-black fw-bolder"
            >
              Order Details
            </label>
            <div className="">
              <textarea
                className="text-area"
                id="dropoff_instructions"
                name="dropoff_instructions"
                value={dropoff_instructions}
                placeholder="Enter Order Details"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-5"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Create Order'}
            </button>
          </form>
        </section>
      </div>
    </Layout>
  )
}

export default DeliveryInfo
