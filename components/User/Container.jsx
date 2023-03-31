import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Slider } from '@material-ui/core';
import { useNode } from '@craftjs/core';
import ColorPicker from 'material-ui-color-picker';

const Container = ({ background, padding = 0, width = "100%", marginTop = 9, marginBottom = 9, marginLeft = 0, marginRight = 0, children, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div className='flex flex-around flex-row'>
    <Paper {...props} ref={ref => connect(drag(ref))} style={{ margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`, background, padding: `${padding}px`, width: `${width}` }}>
      {children}
    </Paper>
    </div>
  )
}

const ContainerDefaultProps = {
  background: "#CBCBCB",
  padding: 3,
  width: "100%"
};

export { ContainerDefaultProps };

const ContainerSettings = () => {
  const { background, padding, width, marginTop, marginBottom, marginLeft, marginRight, actions: { setProp }, related } = useNode(node => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    width: node.data.props.width || "100%",
    marginTop: node.data.props.marginTop || 0,
    marginBottom: node.data.props.marginBottom || 0,
    marginLeft: node.data.props.marginLeft || 0,
    marginRight: node.data.props.marginRight || 0,
    related: node.related
  }));

  const handleWidthChange = (event) => {
    setProp((props) => (props.width = event.target.value));
  };

  const handleMarginTopChange = (_, value) => {
    setProp((props) => (props.marginTop = value));
  };

  const handleMarginBottomChange = (_, value) => {
    setProp((props) => (props.marginBottom = value));
  };

  const handleMarginLeftChange = (_, value) => {
    setProp((props) => (props.marginLeft = value));
  };

  const handleMarginRightChange = (_, value) => {
    setProp((props) => (props.marginRight = value));
  };

  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <ColorPicker defaultValue={background} name="background-color" value={background} onChange={(color) => { setProp(props => props.background = color) }} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider defaultValue={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend"> Width </FormLabel>
        <RadioGroup name='width' value={width} onChange={handleWidthChange} >
        <FormControlLabel value="25%" control={<Radio />} label="25%" />
          <FormControlLabel value="50%" control={<Radio />} label="50%" />
          <FormControlLabel value="75%" control={<Radio />} label="75%"/>
          <FormControlLabel value="100%" control={<Radio />} label="100%" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Margin Top</FormLabel>
        <Slider
        defaultValue={marginTop}
        onChange={handleMarginTopChange} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Margin Bottom</FormLabel>
        <Slider
        defaultValue={marginBottom}
        onChange={handleMarginBottomChange} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Margin Left</FormLabel>
        <Slider
        defaultValue={marginLeft}
        onChange={handleMarginLeftChange} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Margin Right</FormLabel>
        <Slider
        defaultValue={marginRight}
        onChange={handleMarginRightChange} />
      </FormControl>
      
    </div>
  )
}

Container.craft = {
  props: ContainerDefaultProps,
  
  related: {
    settings: ContainerSettings
  }
}

export {ContainerSettings}

export default Container