import { useNode } from '@craftjs/core'
import { FormControl, FormLabel, Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable';

const Text = ({ text, fontSize, textAlign }) => {
  const { connectors: {connect, drag}, isActive, actions: {setProp} } = useNode((node) => ({
    isActive: node.events.selected
  }));

  const [editable, setEditable] = useState(false);
  
  // useEffect(() => {!hasSelectedNode && setEditable(false)}, [hasSelectedNode]);

 

  const handleDragStart = (e) => {
    if (text === 'Drag') {
      e.preventDefault();
      return;
    }
  }

  return (

    <div
      ref={ref => connect(drag(ref))}
      onDragStart={handleDragStart}
      style={{ cursor: text === 'Drag' ? 'not-allowed' : 'move' }}
      onClick={e => setEditable(true)}
    >
      <ContentEditable
      disabled={!editable}
      html={text}
      onChange={e =>
      setProp(props =>
        props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
        )
      }
      tagName="p"
      style={{fontSize: `${fontSize}px`, textAlign}}
      />
      {/* {
        hasSelectedNode || hasDraggedNode && (
          <FormControl className="text-additional-settings" size="small">
            <FormLabel component="legend">Font size</FormLabel>
            <Slider
              defaultValue={fontSize}
              step={1}
              min={7}
              max={50}
              valueLabelDisplay="auto"
              onChange={(_, value) => {
                setProp(props => ({ ...props, fontSize: value }));
              }}
            />
          </FormControl>
        )
      } */}
      
    </div>
  )
}

const TextSettings = () => {
  const { actions: {setProp}, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize
  }));

  return (
    <>
    <FormControl size='small' component="fieldset">
      <FormLabel component="legend">Font Size</FormLabel>
      <Slider 
      value={fontSize || 7}
      step={7}
      min={1}
      max={50}
      onChange={(_, value) => {
        setProp(props => props.fontSize = value);
      }}
      />
    </FormControl>
    </>
  )
}

Text.craft = {
  props: {
    text: "Hi",
    fontSize: 20
  },
  rules: {
    canDrag: (node) => node.data.props.text !== 'Drag',
  },
  related: {
    settings: TextSettings
  },
};


export default Text
