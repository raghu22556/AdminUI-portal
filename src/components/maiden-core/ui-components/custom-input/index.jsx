import React from 'react';
import { InputComponent } from '../input-component';
import { TextField } from '@material-ui/core';

export class CustomInput extends InputComponent {
  render() {
    return <TextField style={{ width: 200 }} {...this.props} />;
  }
}
