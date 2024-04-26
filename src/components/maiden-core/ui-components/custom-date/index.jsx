import React from 'react';
import { InputComponent } from '../input-component';
import { KeyboardDatePicker } from '@material-ui/pickers';

export class CustomDateInput extends InputComponent {
  render() {
    return <KeyboardDatePicker {...this.props} />;
  }
}
