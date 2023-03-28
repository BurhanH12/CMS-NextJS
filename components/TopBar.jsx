import React from "react";
import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Snackbar, Dialog, DialogContent, TextField, DialogActions, DialogTitle } from "@material-ui/core";
import { useEditor } from "@craftjs/core";
import { useState } from "react";
import copy from "copy-to-clipboard";
import LZUTF8 from "lzutf8";

const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }))

  const [dialogOpen, SetDialogOpen] = useState(false);
  const [ snackBarMessage, setSnackbarMessage ] = useState();
  const [ stateToLoad, setStateToLoad] = useState(null)
 
  return (
    <div className="px-0 py-0 mt-0 mb-0 bg-blue-100">
      <Box>
        <Grid container alignItems="center">
          <Grid item xs>
            <FormControlLabel
            className="enable-disable-toggle"
              control={<Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}
              label="Enable"
            />
          </Grid>
          <Grid item>
            <MaterialButton
            className="copy-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={()  => {
              const json = query.serialize();
              copy(LZUTF8.encodeBase64(LZUTF8.compress(json)));
              setSnackbarMessage("State copied to clipboard")
            }}
            >
              Copy current State    
            </MaterialButton>
            <MaterialButton
            className="load-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => SetDialogOpen(true)}
            >
              Load
            </MaterialButton>
            <Dialog
            open={dialogOpen}
            onClose={() => SetDialogOpen(false)}
            fullWidth
            maxWidth="md"
            >
              <DialogTitle id="alert-dialog-title">Load State</DialogTitle>
              <DialogContent>
                <TextField
                multiline
                fullWidth
                placeholder='Paste the Contents that was copied from the "Copy Current State" button'
                size="small"
                value={stateToLoad}
                onChange={e => setStateToLoad(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                  <MaterialButton onClick={() => SetDialogOpen(false)} color="primary">
                    Cancel
                  </MaterialButton>
                  <MaterialButton
                  onClick={() =>  {
                    SetDialogOpen(false)
                    const json = LZUTF8.decompress(LZUTF8.decodeBase64(stateToLoad))
                    actions.deserialize(json)
                    setSnackbarMessage("State Loaded")
                  }}
                  color="primary"
                  autofocus
                  >
                    Load
                  </MaterialButton>
                </DialogActions>
            </Dialog>
            <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
            open={!!snackBarMessage}
            onClose={() => setSnackbarMessage(null)}
            message={<span>{snackBarMessage}</span>}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
};

export default Topbar;
