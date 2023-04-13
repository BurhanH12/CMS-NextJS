import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Slider, ClickAwayListener, Button } from '@material-ui/core';
import { useNode } from '@craftjs/core';
import ColorPicker from 'material-ui-color-picker';

const Container = ({ background, padding = 0, width = "100%", marginTop = 9, marginBottom = 9, marginLeft = 0, marginRight = 0, children, flexDirection, alignItems, justifyContent, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Paper  {...props} ref={ref => connect(drag(ref))} style={{ margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`, background, padding: `${padding}px`, width: `${width}`, alignItems: `${alignItems}`, justifyContent: `${justifyContent}`, display: 'flex', flexDirection: `${flexDirection ? flexDirection : 'column'}` }}>
      {children}
    </Paper>
  )
}

const ContainerDefaultProps = {
  background: "#CBCBCB",
  padding: 3,
  width: "100%",
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'justify-start'
};

export { ContainerDefaultProps };

const ContainerSettings = () => {
  const { background, padding, width, marginTop, marginBottom, marginLeft, marginRight, justifyContent, flexDirection, alignItems, actions: { setProp }, related } = useNode(node => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    width: node.data.props.width || "100%",
    marginTop: node.data.props.marginTop || 0,
    marginBottom: node.data.props.marginBottom || 0,
    marginLeft: node.data.props.marginLeft || 0,
    marginRight: node.data.props.marginRight || 0,
    flexDirection: node.data.props.flexDirection || 'row',
    alignItems: node.data.props.alignItems || 'flex-start',
    justifyContent: node.data.props.justifyContent || 'justify-start',
    related: node.related
  }));

  const handleJustifyContentChange = (event) => {
    setProp((props) => (props.justifyContent = event.target.value));
  }

  const handleFlexDirectionChange = (event) => {
    setProp((props) => (props.flexDirection = event.target.value));
  }

  const handleAlignItemsChange = (event) => {
    setProp((props) => (props.alignItems = event.target.style));
  }

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

  const [showMarginDropdown, setShowMarginDropdown] = useState(false);
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false);
  const [showWidthDropdown, setShowWidthDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowAlignmentDropdown(!showAlignmentDropdown);
  };

  const handleToggleDropdown2 = () => {
    setShowMarginDropdown(!showMarginDropdown);
  };

  const handleToggleDropdown3 = () => {
    setShowWidthDropdown(!showWidthDropdown);
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
      <ClickAwayListener onClickAway={() => setShowWidthDropdown(false)}>
        <div>
          <Button onClick={handleToggleDropdown3}>Width</Button>
          {showWidthDropdown && (
            <div>
              <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend"> Width </FormLabel>
                <RadioGroup name='width' value={width} onChange={handleWidthChange} >
                  <FormControlLabel value="25%" control={<Radio />} label="25%" />
                  <FormControlLabel value="50%" control={<Radio />} label="50%" />
                  <FormControlLabel value="75%" control={<Radio />} label="75%" />
                  <FormControlLabel value="100%" control={<Radio />} label="100%" />
                </RadioGroup>
              </FormControl>
            </div>
          )}
        </div>
      </ClickAwayListener>

      <ClickAwayListener onClickAway={() => setShowMarginDropdown(false)}>
        <div>
          <Button onClick={handleToggleDropdown2}>Margin</Button>
          {showMarginDropdown && (
            <div>

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
          )}
        </div>
      </ClickAwayListener>

      <ClickAwayListener onClickAway={() => setShowAlignmentDropdown(false)}>
        <div>
          <Button onClick={handleToggleDropdown}>Alignment</Button>
          {showAlignmentDropdown && (
            <div>
              <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Flex Direction</FormLabel>
                <RadioGroup name='flexDirection' defaultValue="column" onChange={handleFlexDirectionChange}>
                  <FormControlLabel value="row" control={<Radio />} label="Row" />
                  <FormControlLabel value="column" control={<Radio />} label="Column" />
                </RadioGroup>
              </FormControl>
              {/* <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Align Items</FormLabel>
                <RadioGroup name='alignItems' onChange={handleAlignItemsChange}>
                  <FormControlLabel value="items-start" control={<Radio />} label="Flex Start" />
                  <FormControlLabel value="items-center" control={<Radio />} label="Center" />
                  <FormControlLabel value="items-end" control={<Radio />} label="Flex End" />
                </RadioGroup>
              </FormControl> */}
              <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Justify Content</FormLabel>
                <RadioGroup name='flexDirection' defaultValue="column" onChange={handleJustifyContentChange}>
                  <FormControlLabel value="start" control={<Radio />} label="Start" />
                  <FormControlLabel value="center" control={<Radio />} label="Center" />
                  <FormControlLabel value="end" control={<Radio />} label="End" />
                </RadioGroup>
              </FormControl>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  )
}

Container.craft = {
  props: ContainerDefaultProps,

  related: {
    settings: ContainerSettings
  }
}

export { ContainerSettings }

export default Container