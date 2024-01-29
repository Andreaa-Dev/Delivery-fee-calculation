import React, { FC } from "react";
import { useField, FieldAttributes } from "formik";

interface FormFieldProps extends FieldAttributes<any> {
  label: string;
}

export default function FormField({ label, ...props }: FormFieldProps) {
  const [field, meta] = useField(props as any);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
