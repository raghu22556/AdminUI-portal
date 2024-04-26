import React from 'react';
import { InputComponent } from '../input-component';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

export class CustomDateTimeInput extends InputComponent {
  render() {
    return <KeyboardDateTimePicker {...this.props} ampm={false} />;
  }
}
