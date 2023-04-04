import React from 'react';
import { Box, FormControl, FormLabel, Grid, Slider, Button as MaterialButton, Typography, Chip } from "@material-ui/core";
import { useEditor } from '@craftjs/core';


export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      const currentNode = query.node(currentNodeId);

      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: currentNode.isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return isEnabled && selected ? (
    <Box className="bg-gray-200 mt-2 px-2 py-2">
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs><Typography variant="subtitle1">Selected</Typography></Grid>
              <Grid item><Chip size='small' color='primary' label={selected.name}/></Grid>
            </Grid>
          </Box>
        </Grid>
        {
          selected.settings && React.createElement(selected.settings)
        }
        {/* <FormControl size='small' component="fieldset">
          <FormLabel component="legend">Prop</FormLabel>
          <Slider 
          defaultValue={0}
          step={1}
          min={1}
          max={50}
          valueLabelDisplay="off"
          />
        </FormControl> */}
        {
          selected.isDeletable ? (
            <MaterialButton
              variant='contained'
              color='default'
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
              Delete
            </MaterialButton>
          ) : null
        }
      </Grid>
    </Box>
  ): null
}
