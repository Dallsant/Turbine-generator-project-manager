import { TextField } from "@material-ui/core";
import React from "react";

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    variant,
    ...others
  } = props;
  return (
    <TextField
      label={label}
      {...others}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
