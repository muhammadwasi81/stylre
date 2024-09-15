import React from 'react'
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from '@mui/material'
import { ShoppingCart, MapPin, FileText, CreditCard } from 'lucide-react'

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

const ConfirmationStep = () => {
  return (
    <Box className="bg-gray-100 p-4 md:p-6">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Box className="bg-white p-4 md:p-6 rounded-lg shadow mb-4">
            <Typography variant="h6" className="font-semibold mb-2">
              Order Pickup Checkout:
            </Typography>
            <Stepper
              activeStep={4}
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
                      <CustomStep label={label} active={index === 4} />
                    )}
                  />
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box className="bg-white p-4 md:p-6 rounded-lg shadow text-center">
            <Typography variant="h6" className="font-semibold mb-4">
              Thank you! 🎉
            </Typography>
            <Typography variant="h5" className="font-bold mb-6" sx={{ mb: 6 }}>
              Your order pickup
              <br />
              request has been
              <br />
              received
            </Typography>
            <Typography variant="body1" className="mb-6" sx={{ mb: 3 }}>
              Order Pickup Total: <span className="font-bold">$29.05</span>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              className="bg-orange-500 hover:bg-orange-600"
              startIcon={<ShoppingCart />}
              sx={{
                borderRadius: '27px',
              }}
            >
              Track Your Pickup Delivery
            </Button>
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
                className="mr-2 w-10 mt-1"
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
            <Box className="flex items-start mb-4">
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
              </Box>
            </Box>

            <Typography variant="subtitle2" className="font-semibold mb-2">
              Payment Details
            </Typography>
            <Box className="flex items-start">
              <CreditCard className="text-orange-500 mr-2" size={20} />
              <Box>
                <Typography variant="body2" className="font-semibold">
                  Payment with Card
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Card Ending: ****387
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Zip Code: 34786
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Total Charged: $29.05
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConfirmationStep
