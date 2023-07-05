import { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Layout from './Layout'
import { createPaymentAction, reset } from '../features/payment/paymentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const PaymentInfo = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, message } = useSelector((state) => state.payment)

  const [data, setData] = useState({
    email: '',
    amount: '',
  })
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { email, amount } = data

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(`Payment successful!`)
      setData({
        email: '',
        amount: '',
      })
    }
    dispatch(reset())
  }, [dispatch, isSuccess, message, isError])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!amount || !email) {
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
        amount: data.amount,
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
      <form onSubmit={onSubmit} className="container paymentWrapper">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount ($)</label>
          <input
            className="form-control"
            name="amount"
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="Enter the amount you want to pay"
          />
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Card Details</label>
          <CardElement />
        </div>
        <button
          disabled={loading}
          className="btn btn-primary w-25"
          type="submit"
        >
          {loading ? 'Loading...' : 'Pay'}
        </button>
      </form>
    </Layout>
  )
}

export default PaymentInfo
