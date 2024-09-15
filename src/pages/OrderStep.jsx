import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  LinearProgress,
  Divider,
} from '@mui/material'
import { Upload, FileText, Trash2 } from 'lucide-react'

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

const OrderDetailsStep = ({ setCurrentStep }) => {
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile)
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 500)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadProgress(0)
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
              activeStep={1}
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
                      <CustomStep label={label} active={index === 1} />
                    )}
                  />
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box className="bg-white p-2 px-4 md:p-6 rounded-lg shadow">
            <Box className="flex justify-between items-center">
              <Typography variant="h6" className="font-semibold">
                Order Pickup Details
              </Typography>
              <Button className="text-orange-500">
                <span className="text-2xl mr-1">↻</span>
              </Button>
            </Box>
            <Divider />
            <Typography variant="subtitle1" className="font-semibold mb-2 mt-1">
              Upload your Order Pickup Barcode/QR Code provided by the retailer
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              We automatically send your Barcode/QR code Order Pickup details to
              the delivery partner, however you may receive a call / text
              requesting confirmation to ensure accuracy when picking up your
              order
            </Typography>

            <Box className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
              {!file ? (
                <>
                  <Upload className="mx-auto mb-2 text-orange-500" size={48} />
                  <Typography variant="body1" className="text-orange-500 mb-1">
                    Click to Upload or drag and drop
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    (Max. File size: 5 MB)
                  </Typography>
                  <Typography variant="caption" className="block text-gray-500">
                    (File Type: pdf only)
                  </Typography>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      className="mt-2"
                    >
                      Select File
                    </Button>
                  </label>
                </>
              ) : (
                <Box className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                  <Box className="flex items-center">
                    <FileText className="text-orange-500 mr-2" size={24} />
                    <Box>
                      <Typography variant="body2">{file.name}</Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {(file.size / 1024).toFixed(0)} KB
                      </Typography>
                    </Box>
                  </Box>
                  <Button onClick={handleRemoveFile}>
                    <Trash2 className="text-gray-500" size={20} />
                  </Button>
                </Box>
              )}
            </Box>

            {file && (
              <Box className="mb-4">
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" className="text-right block mt-1">
                  {uploadProgress}%
                </Typography>
              </Box>
            )}

            <Typography variant="body2" className="text-gray-600 mb-4">
              When saving your Order Pickup email, select Print, then Adobe PDF
              or Save to PDF
            </Typography>

            <Box className="flex justify-end">
              <Button
                variant="contained"
                onClick={() => setCurrentStep(2)}
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
            <Typography variant="body2" className="mb-4">
              Your Order Pickup Details are below
            </Typography>

            <Typography variant="subtitle2" className="font-semibold mb-2">
              Store Details
            </Typography>
            <Box className="flex items-start mb-2">
              <img
                src="https://e7.pngegg.com/pngimages/125/287/png-clipart-logo-dillard-s-brand-graphics-font-aol-logo.png"
                alt="Dillards logo"
                className="mr-2 w-12 mt-1 rounded-full "
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderDetailsStep
