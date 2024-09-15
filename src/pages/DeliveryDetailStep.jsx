import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from '@mui/material'
import { MapPin, Plus } from 'lucide-react'

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

const DeliveryDetailsStep = ({ setCurrentStep }) => {
  const [selectedAddress, setSelectedAddress] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('doordash')

  const addresses = [
    '2992 Isabella Ct, Windermere, FL 34786',
    '360 Cochran Pl, Valley Stream, NY 11581',
    '818 Antonette Ave, Winter Park, FL 32789',
    '1030 Alba Dr, Orlando, FL 32804',
  ]

  return (
    <Box className="bg-gray-100 p-4 md:p-6">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Box className="bg-white p-4 md:p-6 rounded-lg shadow mb-4">
            <Typography variant="h6" className="font-semibold mb-2">
              Order Pickup Checkout:
            </Typography>
            <Stepper
              activeStep={2}
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
                      <CustomStep label={label} active={index === 2} />
                    )}
                  />
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box className="bg-white p-2 px-4 md:p-6 rounded-lg shadow">
            <Box className="flex justify-between items-center">
              <Typography variant="h6" className="font-semibold">
                Delivery Details
              </Typography>
              <Button className="text-orange-500">
                <span className="text-2xl mr-1">↻</span>
              </Button>
            </Box>
            <Divider />
            <Typography variant="subtitle1" className="font-semibold mb-2 mt-1">
              Where is the order being delivered?*
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              For safety, a person 18 and over must be present to sign for your
              pickup upon dropoff
            </Typography>

            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="mb-4"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select Address</option>
              {addresses.map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))}
            </TextField>

            <Button
              startIcon={<Plus size={16} />}
              className="text-orange-500 mb-6"
            >
              Add New Address
            </Button>

            <Typography variant="subtitle1" className="font-semibold mb-4">
              Select Delivery Method
            </Typography>

            <RadioGroup
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    className={`border rounded-lg p-4 ${
                      deliveryMethod === 'doordash'
                        ? 'border-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FormControlLabel
                      value="doordash"
                      control={<Radio color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body1">Doordash</Typography>
                          <Typography variant="body2" className="text-gray-600">
                            Delivery through Doordash
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-orange-500 font-semibold"
                          >
                            Delivery Cost: $19.45
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    className={`border rounded-lg p-4 ${
                      deliveryMethod === 'uber'
                        ? 'border-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FormControlLabel
                      value="uber"
                      control={<Radio color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body1">
                            Uber (Coming Soon)
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            Delivery through Uber
                            <Typography>Delivery Cost: $19.45</Typography>
                          </Typography>
                        </Box>
                      }
                      disabled
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* rush pickup */}
              <Typography sx={{ my: 2, color: '#666666', fontWeight: 600 }}>
                Is this a Rush Pickup (Priority?)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    className={`border rounded-lg p-4 ${
                      deliveryMethod === 'doordash'
                        ? 'border-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FormControlLabel
                      value="doordash"
                      control={<Radio color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body1">Yes</Typography>
                          <Typography
                            variant="body2"
                            className="text-[#6B7280] font-bold"
                          >
                            Express Fee: $2.99
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    className={`border rounded-lg p-4 ${
                      deliveryMethod === 'doordash'
                        ? 'border-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FormControlLabel
                      value="doordash"
                      disabled
                      control={<Radio color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body1">No</Typography>
                          <Typography
                            variant="body2"
                            className="text-[#6B7280] font-bold"
                          >
                            Express Fee: $0.00
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup>

            <Box className="flex justify-end mt-6">
              <Button
                variant="contained"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setCurrentStep(3)}
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
            <Typography variant="body2" className="mb-4">
              Your Order Pickup Details are below
            </Typography>

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
            <Box className="flex items-start">
              <MapPin className="text-orange-500 mr-2" size={20} />
              <Box>
                <Typography variant="body2" className="font-semibold">
                  OrderPickup.pdf
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Order No: DW3EBD
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Barcode ID: 700015P6T3
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Total Items: 1
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Order Total: $23.99
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeliveryDetailsStep
