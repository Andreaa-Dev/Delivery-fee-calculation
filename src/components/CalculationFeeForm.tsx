import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useCalculate } from "../hook/useCalculate";
import { Box } from "@material-ui/core";

type InitialValues = {
  cartValue: number;
  deliveryDistanceKilometer: number;
  numberOfItems: number;
  time: Dayjs;
};

const initialValues: InitialValues = {
  cartValue: 0,
  deliveryDistanceKilometer: 0,
  numberOfItems: 0,
  time: dayjs(),
};

const validationSchema = Yup.object({
  cartValue: Yup.number().required("Required"),
  deliveryDistanceKilometer: Yup.number().required("Required"),
  numberOfItems: Yup.number().required("Required"),
  time: Yup.date().required("Required"),
});

export default function CalculationFeeForm() {
  const { fee, calculateFee } = useCalculate();

  function onSubmitHandler(values: InitialValues) {
    console.log(values);
    calculateFee({
      ...values,
      time: values.time.toDate(),
    });
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });

  return (
    <Box className="form">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Calculation Fee Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="cartValue"
            name="cartValue"
            label="Cart Value (€)"
            type="number"
            value={formik.values.cartValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cartValue && Boolean(formik.errors.cartValue)}
            helperText={formik.touched.cartValue && formik.errors.cartValue}
          />

          <br />
          <TextField
            id="deliveryDistanceKilometer"
            name="deliveryDistanceKilometer"
            label="Delivery Distance (km)"
            type="number"
            value={formik.values.deliveryDistanceKilometer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.deliveryDistanceKilometer &&
              Boolean(formik.errors.deliveryDistanceKilometer)
            }
            helperText={
              formik.touched.deliveryDistanceKilometer &&
              formik.errors.deliveryDistanceKilometer
            }
          />
          <br />

          <TextField
            id="numberOfItems"
            name="numberOfItems"
            label="Number Of Items"
            type="number"
            value={formik.values.numberOfItems}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.numberOfItems &&
              Boolean(formik.errors.numberOfItems)
            }
            helperText={
              formik.touched.numberOfItems && formik.errors.numberOfItems
            }
          />
          <br />
          <DateTimePicker
            sx={{ margin: "10px" }}
            name="time"
            disablePast
            defaultValue={formik.values.time}
            views={["year", "month", "day", "hours", "minutes"]}
            onChange={(value) => formik.setFieldValue("time", value)}
          />
          <br />

          <Button color="primary" variant="contained" type="submit">
            Calculate delivery fee
          </Button>
        </form>
        <p> Delivery fee: {fee} (€)</p>
      </LocalizationProvider>
    </Box>
  );
}
