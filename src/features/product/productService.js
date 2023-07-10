import axios from 'axios'

const API_URL = '/api/products/'

const createProductService = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}create_product`, payload)
    console.log(response.data, 'createDeliveryService')
    return response.data
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message, { cause: error })
  }
}

const productService = {
  createProductService,
}

export default productService
