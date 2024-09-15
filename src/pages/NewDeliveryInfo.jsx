import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
} from '@mui/material'
import Layout from './Layout'
import OrderDetailsStep from './OrderStep'
import DeliveryDetailsStep from './DeliveryDetailStep'
import CartPaymentStep from './CartPaymentStep'
import ConfirmationStep from './ThanksStep'

const steps = [
  'Store Details',
  'Order Details',
  'Delivery Details',
  'Cart & Payment',
  'Complete',
]

const stores = [
  { name: "Dick's Sporting Goods", logo: '/api/placeholder/24/24' },
  { name: 'Dillards', logo: '/api/placeholder/24/24' },
  { name: 'Express', logo: '/api/placeholder/24/24' },
  { name: 'Fabletics', logo: '/api/placeholder/24/24' },
  { name: 'Finish Line', logo: '/api/placeholder/24/24' },
  { name: 'Foot Action', logo: '/api/placeholder/24/24' },
  { name: 'Foot Locker', logo: '/api/placeholder/24/24' },
  { name: 'Forever21', logo: '/api/placeholder/24/24' },
  { name: 'Free People', logo: '/api/placeholder/24/24' },
  { name: 'Gap', logo: '/api/placeholder/24/24' },
  { name: 'Guess', logo: '/api/placeholder/24/24' },
  { name: 'H&M', logo: '/api/placeholder/24/24' },
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

const PickupScheduler = () => {
  const [selectedStore, setSelectedStore] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <Layout title={'Pickup Schedule'}>
      {currentStep === 0 ? (
        <Box className="bg-gray-100 p-4 md:p-6">
          <Typography variant="h5" className="font-bold mb-4">
            Schedule a Pickup
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Box className="bg-white p-4 md:p-6 rounded-lg shadow mb-4">
                <Typography variant="h6" className="font-semibold mb-2">
                  Order Pickup Checkout:
                </Typography>
                <Stepper
                  activeStep={0}
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
                          <CustomStep label={label} active={index === 0} />
                        )}
                      />
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Box className="bg-white p-2 px-4 md:p-6 rounded-lg shadow">
                <Box className="flex justify-between items-center">
                  <Typography variant="h6" className="font-semibold">
                    Store Details
                  </Typography>
                  <Button className="text-orange-500">
                    <span className="text-2xl mr-1">+</span> Add
                  </Button>
                </Box>
                <Divider />
                <Typography variant="body2" className="mb-4">
                  Select the retail store where you place your order
                </Typography>

                <Select
                  fullWidth
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  displayEmpty
                  renderValue={
                    selectedStore !== '' ? undefined : () => 'Select store'
                  }
                  className="mb-4"
                >
                  {stores.map((store) => (
                    <MenuItem key={store.name} value={store.name}>
                      <Box className="flex items-center">
                        <img
                          src={store.logo}
                          alt={`${store.name} logo`}
                          className="mr-2"
                        />
                        <Typography>{store.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Select Location"
                  className="mb-4"
                />

                <Box className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="contained"
                    sx={{
                      backgroundColor: '#FF7009',
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Box className="bg-white p-4 md:p-6 rounded-lg shadow">
                <Typography variant="h6" className="font-semibold mb-4">
                  Order Pickup Summary
                </Typography>
                <Typography variant="body2" className="mb-4" color="#6B7280">
                  Your Order Pickup Details are below
                </Typography>

                {selectedStore && (
                  <>
                    <Typography
                      variant="subtitle2"
                      className="font-semibold mb-2"
                    >
                      Store Details
                    </Typography>
                    <Box className="flex items-center">
                      <img
                        src={
                          stores.find((store) => store.name === selectedStore)
                            ?.logo
                        }
                        alt={`${selectedStore} logo`}
                        className="mr-2"
                      />
                      <Typography>{selectedStore}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : currentStep === 1 ? (
        <OrderDetailsStep setCurrentStep={() => setCurrentStep(2)} />
      ) : currentStep === 2 ? (
        <DeliveryDetailsStep setCurrentStep={() => setCurrentStep(3)} />
      ) : currentStep === 3 ? (
        <CartPaymentStep setCurrentStep={() => setCurrentStep(4)} />
      ) : (
        <ConfirmationStep />
      )}
    </Layout>
  )
}

export default PickupScheduler
