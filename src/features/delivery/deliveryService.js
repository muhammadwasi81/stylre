import apiPrefix from '../../utils/token'

const createDeliveryService = async (payload) => {
  console.log(payload, 'payload in service')
  try {
    const response = await apiPrefix.post(`delivery/create_delivery`, payload)
    console.log('createDeliveryService=>', response)
    return response
  } catch (error) {
    console.log(error.message, 'error creating delivery')
    throw new Error(error, { cause: error })
  }
}

const getDeliveryStatusService = async (userId) => {
  console.log(userId, 'userId in service')
  try {
    const response = await apiPrefix.get(
      `/get_delivery_status?userId=${userId}`
    )
    console.log(response.data, 'getDeliveryStatus')
    return response.data
  } catch (error) {
    console.log(error.message, 'error getting delivery status')
    throw new Error(error.message, { cause: error })
  }
}
const deliveryService = {
  createDeliveryService,
  getDeliveryStatusService,
}

export default deliveryService
