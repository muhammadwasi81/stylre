import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Divider,
} from '@mui/material'
import { ShoppingCart, MapPin, FileText } from 'lucide-react'
import SchedulePickupIcon from '../assets/svg/schedulebuttonIcon'

const steps = [
  'Store Details',
  'Order Details',
  'Delivery Details',
  'Cart & Payment',
  'Complete',
]

const CustomStep = ({ label, active }) => (
  <Box
    className={`flex flex-col items-center ${
      active ? 'text-orange-500' : 'text-gray-400'
    }`}
  >
    <div
      className={`w-5 h-5 rounded-full border-2 ${
        active ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
      } flex items-center justify-center mb-1`}
    >
      {active && <span className="text-white text-sm">✓</span>}
    </div>
    <Typography variant="caption">{label}</Typography>
  </Box>
)

const CartPaymentStep = ({ setCurrentStep }) => {
  const [tipAmount, setTipAmount] = useState('4.00')
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handleTipChange = (amount) => {
    setTipAmount(amount)
  }

  return (
    <Box className="bg-gray-100 p-4 md:p-6">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Box className="bg-white p-4 md:p-6 rounded-lg shadow mb-4">
            <Typography variant="h6" className="font-semibold mb-2">
              Order Pickup Checkout:
            </Typography>
            <Stepper
              activeStep={3}
              alternativeLabel
              sx={{
                '& .MuiStepConnector-line': {
                  borderTopWidth: '2px',
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <CustomStep label={label} active={index === 3} />
                    )}
                  />
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box className="bg-white p-2 px-4 md:p-6 rounded-lg shadow">
            <Box className="flex justify-between items-center">
              <Typography variant="h6" className="font-semibold">
                Cart & Payment
              </Typography>
              <Button className="text-orange-500">
                <span className="text-2xl mr-1">↻</span>
              </Button>
            </Box>
            <Divider />
            <Box className=" rounded-lg p-6 mb-6">
              <Box className="flex justify-center items-center mb-4">
                <ShoppingCart className="text-gray-500 mr-2" size={24} />
                <Typography variant="h6" className="font-semibold">
                  Order Pickup Cart
                </Typography>
              </Box>

              <Box className="space-y-2 mb-4">
                <Box className="flex justify-between">
                  <Typography>Service Fee</Typography>
                  <Typography className="font-semibold">$10.99</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Delivery Fee</Typography>
                  <Typography className="font-semibold">$ 8.50</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Taxes & Fees</Typography>
                  <Typography className="font-semibold">$ 6.57</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Express Fee</Typography>
                  <Typography className="font-semibold">$ 2.99</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Delivery Tip</Typography>
                  <Typography className="font-semibold">
                    $ {tipAmount}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="subtitle2"
                className="font-semibold mb-2"
                sx={{ fontWeight: 600, textAlign: 'center' }}
              >
                ADD TIP
              </Typography>
              <Box className="flex justify-center space-x-4 mb-4">
                <RadioGroup
                  row
                  value={tipAmount}
                  onChange={(e) => handleTipChange(e.target.value)}
                >
                  {['3%', '5%', '10%', '4.00'].map((tip) => (
                    <FormControlLabel
                      key={tip}
                      value={tip}
                      control={
                        <Radio
                          sx={{
                            '&.Mui-checked': {
                              color: '#FF7009', // Orange when checked
                            },
                            '&.MuiRadio-root': {
                              borderRadius: '50%', // Rounded radio buttons
                            },
                          }}
                        />
                      }
                      label={tip}
                      sx={{
                        border: '1px solid gray', // Border around each item
                        borderRadius: '9999px', // Fully rounded edges
                        padding: '4px 12px', // Adjust padding for uniform size
                        '.MuiFormControlLabel-label': {
                          fontWeight: tipAmount === tip ? 'bold' : 'normal', // Bold when selected
                          color: tipAmount === tip ? '#FF7009' : 'gray', // Orange when selected
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </Box>
              <Box className="border-t border-gray-200 pt-4">
                <Box className="flex justify-between items-center">
                  <Typography variant="h6" className="font-semibold">
                    Order Pickup Total
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-bold text-orange-500"
                  >
                    $29.05
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" className="font-semibold mb-4">
              Payment Method
            </Typography>
            <Box
              sx={{
                borderRadius: '12px', // Rounded corners
                paddingX: '10px',
                mb: 2,
              }}
            >
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                {[
                  { value: 'card', label: 'Pay by Card Credit' },
                  { value: 'apple', label: 'Pay with Apple Pay' },
                ].map((method) => (
                  <FormControlLabel
                    key={method.value}
                    value={method.value}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#FF7009', // Change color when selected
                          },
                        }}
                      />
                    }
                    label={method.label}
                    sx={{
                      border: '1px solid gray', // Border for each radio button item
                      borderRadius: '8px', // Rounded radio button container
                      padding: '3px 7px', // Padding inside each option for spacing
                      marginBottom: '12px', // Spacing between each option
                      width: '100%', // Ensure full width for options
                      '&:last-child': {
                        marginBottom: 0, // Remove bottom margin from the last item
                      },
                      '.MuiFormControlLabel-label': {
                        fontWeight:
                          paymentMethod === method.value ? 'bold' : 'normal', // Bold text when selected
                        color:
                          paymentMethod === method.value ? '#FF7009' : 'black', // Text color change when selected
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>

            <Typography variant="subtitle2" className="font-semibold mb-2">
              CARD NUMBER
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="1234 1234 1234"
              className="mb-4"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" className="font-semibold mb-2">
                  EXPIRATION DATE
                </Typography>
                <TextField fullWidth variant="outlined" placeholder="MM/YY" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" className="font-semibold mb-2">
                  CVC
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="CVC code"
                />
              </Grid>
            </Grid>
            <div className="mt-3">
              <Button
                variant="contained"
                fullWidth
                onClick={() => setCurrentStep(4)}
                startIcon={<SchedulePickupIcon />}
                sx={{
                  borderRadius: '27px',
                }}
              >
                Place Order
              </Button>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box className="bg-white p-4 md:p-6 rounded-lg shadow">
            <Typography variant="h6" className="font-semibold mb-4">
              Order Pickup Summary
            </Typography>
            <Typography variant="body2" className="mb-4">
              Your Order Pickup Details are below
            </Typography>

            <Box className="space-y-2 mb-4">
              <Box className="flex justify-between">
                <Typography>Service Fee</Typography>
                <Typography className="font-semibold">$10.99</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Delivery Fee</Typography>
                <Typography className="font-semibold">$8.50</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Tax & Fees</Typography>
                <Typography className="font-semibold">$6.57</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Express Fee</Typography>
                <Typography className="font-semibold">$2.99</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Delivery Tip</Typography>
                <Typography className="font-semibold">$4.00</Typography>
              </Box>
              <Box className="flex justify-between pt-2 border-t border-gray-200">
                <Typography className="font-semibold">Total</Typography>
                <Typography className="font-semibold text-orange-500">
                  $29.05
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" className="font-semibold mb-2">
              Store Details
            </Typography>
            <Box className="flex items-start mb-4">
              <img
                src="https://cdn.worldvectorlogo.com/logos/dillard-s.svg"
                alt="Dillards logo"
                className="w-10 mr-2 mt-1"
              />
              <Box>
                <Typography variant="body2" className="font-semibold">
                  Dillards
                </Typography>
                <Typography variant="body2">Altamonte Mall</Typography>
                <Typography variant="body2" className="text-gray-600">
                  451 E Altamonte Dr, Suite #1101, Altamonte Springs, FL
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" className="font-semibold mb-2">
              Order Pickup Details
            </Typography>
            <Box className="flex items-start mb-4">
              <FileText className="text-orange-500 mr-2" size={20} />
              <Box>
                <Typography variant="body2" className="font-semibold">
                  OrderPickup.pdf
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Order No: 17WVV90
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Barcode ID: QbP5PkF1G
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Total Items: 1
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Order Total: $22.99
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" className="font-semibold mb-2">
              Delivery Details
            </Typography>
            <Box className="flex items-start">
              <MapPin className="text-orange-500 mr-2" size={20} />
              <Box>
                <Typography variant="body2" className="font-semibold">
                  Delivered through Doordash
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  2992 Isabella Cir
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Windermere, FL 34786
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Express: Yes
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CartPaymentStep
