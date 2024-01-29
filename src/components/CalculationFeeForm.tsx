import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import feeCalculator from '../util/feeCalculator'

type InitialValues = {
  cartValue: number
  deliveryDistance: number
  numberOfItems: number
  time: Date
}

const initialValues: InitialValues = {
  cartValue: 0,
  deliveryDistance: 0,
  numberOfItems: 0,
  time: new Date(),
}

const validationSchema = Yup.object({
  cartValue: Yup.number().required('Required'),
  deliveryDistance: Yup.number().required('Required').positive(),
  numberOfItems: Yup.number().required('Required'),
  time: Yup.date(),
})

function onSubmitHandler(values: InitialValues) {
  const fee = feeCalculator.execute(values)
}

export default function CalculationFeeForm() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      onSubmitHandler(values)
    },
  })
  return (
    <div>
      <h1>Calculation Fee Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='cartValue'
          name='cartValue'
          label='Cart Value'
          type='number'
          value={formik.values.cartValue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cartValue && Boolean(formik.errors.cartValue)}
          helperText={formik.touched.cartValue && formik.errors.cartValue}
        />
        <TextField
          fullWidth
          id='deliveryDistance'
          name='deliveryDistance'
          label='Delivery Distance'
          type='number'
          value={formik.values.deliveryDistance}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.deliveryDistance &&
            Boolean(formik.errors.deliveryDistance)
          }
          helperText={
            formik.touched.deliveryDistance && formik.errors.deliveryDistance
          }
        />
        <TextField
          fullWidth
          id='numberOfItems'
          name='numberOfItems'
          label='Number Of Items'
          type='number'
          value={formik.values.numberOfItems}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.numberOfItems && Boolean(formik.errors.numberOfItems)
          }
          helperText={
            formik.touched.numberOfItems && formik.errors.numberOfItems
          }
        />
        <TextField
          fullWidth
          id='time'
          name='time'
          label='Time'
          type='Date'
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.time && Boolean(formik.errors.time)}
          //   helperText={formik.touched.time && formik.errors.time}
        />
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </form>
    </div>
  )
}
