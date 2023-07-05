import axios from 'axios'

const API_URL = '/api/payments/'

const createPaymentService = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}create_payment`, paymentData)
    console.log(response.data, 'createPaymentService')
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error.message, { cause: error })
  }
}

const paymentService = {
  createPaymentService,
}

export default paymentService
