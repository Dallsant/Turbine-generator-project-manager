import {
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

export default function Select(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    identifiers,
    // disableNone,
  } = props;
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      {/* {props.multiple ? null : <MenuItem key="none" value={""}></MenuItem>} */}
      <MuiSelect
        multiple={props.multiple ? props.multiple : false}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        renderValue={
          props.multiple
            ? (selected) => (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {selected.map((value, index) => (
                    <Chip
                      style={{ margin: 2 }}
                      key={index}
                      label={options[index][identifiers[0]]}
                    />
                  ))}
                </div>
              )
            : null
        }
      >
        {/* {!disableNone ? <></> : <MenuItem key="none" value={null}></MenuItem>} */}
        {options.map((item, index) => {
          {
            return item[identifiers[0]] ? (
              <MenuItem
                onClick={() => console.log(value)}
                key={index}
                value={item[identifiers[1]]}
              >
                {item[identifiers[0]]}
              </MenuItem>
            ) : (
              <></>
            );
          }
        })}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
