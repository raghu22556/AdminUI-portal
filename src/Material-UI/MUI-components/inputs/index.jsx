import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 3, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField id="standard-basic" label="Standard" variant="standard" />\
      </div>
      <div>
        <TextField id="filled-basic" label="Filled" variant="filled" />
      </div>
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
    </Box>
  );
}

export function TextFieldSizes() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 3, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
      </div>
      <div>
        <TextField
          label="Size"
          id="outlined-size-normal"
          defaultValue="Normal"
        />
      </div>
    </Box>
  );
}

export function ColorTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 3, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {" "}
      <div>
        <TextField color="primary" focused defaultValue="Input Blue" />
      </div>
      <div>
        <TextField color="secondary" focused defaultValue="Input Purple" />
      </div>
    </Box>
  );
}
