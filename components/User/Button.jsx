import React from 'react';
import {
  Button as MaterialButton,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { useNode } from '@craftjs/core';

const Button = ({ size, variant, color, text, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <MaterialButton ref={(ref) => connect(drag(ref))} size={size} variant={variant} color={color} {...props} className="m-5">
      {text}
    </MaterialButton>
  );
};

const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <FormControl size="large" component="fieldset">
        <FormLabel component="legend">Size</FormLabel>
        <RadioGroup defaultValue={props.size} onChange={(e) => setProp((props) => (props.size = e.target.value))}>
          <FormControlLabel label="Small" value="small" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Medium" value="medium" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Large" value="large" control={<Radio size="small" color="primary" />} />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Variant</FormLabel>
        <RadioGroup defaultValue={props.variant} onChange={(e) => setProp((props) => (props.variant = e.target.value))}>
          <FormControlLabel label="Text" value="text" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Outlined" value="outlined" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Contained" value="contained" control={<Radio size="small" color="primary" />} />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Color</FormLabel>
        <RadioGroup defaultValue={props.color} onChange={(e) => setProp((props) => (props.color = e.target.value))}>
          <FormControlLabel label="Default" value="default" control={<Radio size="small" color="default" />} />
          <FormControlLabel label="Primary" value="primary" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Secondary" value="secondary" control={<Radio size="small" color="primary" />} />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Text</FormLabel>
        <TextField
          defaultValue={props.text}
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          onChange={(e) => setProp((props) => (props.text = e.target.value))}
        />
      </FormControl>
    </div>
  );
};

Button.craft = {
  props: {
    size: 'large',
    variant: 'contained',
    color: 'primary',
    text: 'Click Me',
  },
  related: {
    settings: ButtonSettings,
  },
};

export default Button;
