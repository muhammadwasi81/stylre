import { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Layout from './Layout'
import { createPaymentAction, reset } from '../features/payment/paymentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { runFireworks } from '../utils/runFireworks'
import { useParams } from 'react-router-dom'
// import { getUserByIdAction } from '../features/auth/authSlice'
import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Grid,
} from '@mui/material'

const PaymentInfo = () => {
  const { id } = useParams()
  console.log({ id }, 'useriD')
  const dispatch = useDispatch()

  const { isSuccess, isError, message } = useSelector((state) => state.payment)

  const [data, setData] = useState({
    email: '',
    amount: '',
    cardDetails: '',
  })
  const [cardDetails, setCardDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [processingFee, setProcessingFee] = useState(10.99)
  const [serviceFee, setServiceFee] = useState(4.99)
  const [doorDashFee, setDoorDashFee] = useState(0)
  const stripe = useStripe()
  const elements = useElements()
  const { email, amount } = data

  const getDoorDashFee = () => {
    setDoorDashFee(Math.floor(Math.random() * 10) + 1)
  }

  useEffect(() => {
    getDoorDashFee()
  }, [])

  // const handleChange = (e) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // useEffect(() => {
  //   dispatch(getUserByIdAction(id))
  // }, [id, dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Payment successful!')
      setData({
        email: '',
        amount: '',
      })
      if (elements && elements.getElement) {
        console.log('if successful')
        const cardElement = elements.getElement(CardElement)
        cardElement.clear()
      }
      setCardDetails('')
      runFireworks()
    }
    dispatch(reset())
  }, [dispatch, isSuccess, message, isError])

  const onSubmit = async (e) => {
    e.preventDefault()
    const totalAmount =
      Number(amount) + processingFee + serviceFee + doorDashFee

    if (!amount || !email || !cardDetails) {
      return toast.error('Please fill in all fields')
    }
    setLoading(true)
    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (!error) {
      const paymentPayload = {
        id: paymentMethod.id,
        email: data.email,
        amount: totalAmount,
      }
      console.log(paymentPayload, 'paymentPayload')
      dispatch(createPaymentAction(paymentPayload))
    } else {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <Layout title="Payment Information">
      <div className="payment-info">
        <form
          onSubmit={onSubmit}
          className="container d-flex justify-content-center flex-column align-items-center"
        >
          {/* <div className="mb-3">
          <label className="form-label fw-bolder">Email</label>
          <input
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email address"
          />
        </div> */}
          {/* <div className="mb-3">
          <label className="form-label fw-bolder">Amount</label>
          <input
            className="form-control"
            name="amount"
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="Enter the amount you want to pay"
          />
        </div> */}
          <Box
            sx={{
              background: '#FFFFFF',
              padding: '20px',
              borderRadius: '6px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '500px',
              mt: 5,
            }}
          >
            <Typography variant="h4" gutterBottom fontWeight="600">
              Order Details
            </Typography>
            <Grid container spacing={0}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    height: '44px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    Processing Fee
                  </Typography>
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    ${processingFee}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    height: '44px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    Service Fee
                  </Typography>
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    ${serviceFee}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    height: '44px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    DoorDash Fee
                  </Typography>
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    ${doorDashFee}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    height: '44px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    Tip
                  </Typography>
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    ${5}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    height: '44px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="600" fontSize={16}>
                    ${50}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <div className="mb-3 w-50 mt-5 card-wrapper">
            <label className="form-label fw-bolder fs-2">Card Details</label>
            <CardElement
              value={cardDetails}
              onChange={(event) => setCardDetails(event.complete ? event : '')}
              className="stripe-card"
              options={{
                style: {
                  base: {
                    backgroundColor: '#FFFFFF',
                  },
                },
              }}
            />
          </div>
          <button
            disabled={loading}
            className="btn btn-primary payment__btn"
            type="submit"
          >
            {loading ? 'Loading...' : 'Pay'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default PaymentInfo
