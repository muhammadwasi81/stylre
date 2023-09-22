import axios from 'axios'

const apiGlobal = axios.create({
  // baseURL: 'http://localhost:8000/api/delivery/',
  baseURL: 'https://stylere.onrender.com//api/delivery',
})

const createDeliveryService = async (deliveryData) => {
  try {
    const response = await apiGlobal.post(`/create_delivery`, deliveryData)
    console.log(response.data, 'createDeliveryService')
    return response.data.data
  } catch (error) {
    console.log(error.message, 'error creating delivery')
    throw new Error(error, { cause: error })
  }
}

const deliveryService = {
  createDeliveryService,
}

export default deliveryService
