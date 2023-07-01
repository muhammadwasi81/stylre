import axios from 'axios'

const API_URL = '/api/delivery/'

const createDeliveryService = async (deliveryData) => {
  try {
    const response = await axios.post(`${API_URL}create_delivery`, deliveryData)
    console.log(response.data, 'createDeliveryService')
    return response.data.data
  } catch (error) {
    console.log(error)
    throw new Error(error.message, { cause: error })
  }
}

const deliveryService = {
  createDeliveryService,
}

export default deliveryService
