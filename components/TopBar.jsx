import React, { useEffect } from "react";
import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Snackbar, Dialog, DialogContent, TextField, DialogActions, DialogTitle, Button } from "@material-ui/core";
import { useEditor } from "@craftjs/core";
import { useState } from "react";
import LZUTF8 from "lzutf8";
import { data } from "autoprefixer";
import { Router, useRouter } from "next/router";


const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))


  const [dialogOpen, SetDialogOpen] = useState(false);
  const [dialogOpen2, SetDialogOpen2] = useState(false);
  const [ snackBarMessage, setSnackbarMessage ] = useState();
  const [ snackBarMessage2, setSnackbarMessage2 ] = useState();
  const [ stateToLoad, setStateToLoad] = useState(null)
  const [ blogName, setBlogName] = useState("");
  const [holdstate, setHoldState] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getName", {
    method: "GET",
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "StateSaver");
    setData(data.data);
  });
  },[]);

  const handleSave = () => {
    console.log("Blog Name:", blogName);
    console.log("Hold State:", holdstate);

    fetch("http://localhost:5000/save", {
  method: "POST",
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "",
  },
  body: JSON.stringify({
    name: blogName,
    state: holdstate,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "StateSaver");
  });
  }

  useEffect(() => {
    handleSave();
  }, [holdstate]);

  const router = useRouter();

  function handleClick () {
    router.reload();
  }
  
  
 
  return (
    <div className="px-0 py-0 mt-0 mb-0 bg-blue-100">
      <Box>
        <Grid container alignItems="center">
          <Grid item xs>
            <FormControlLabel
            className="enable-disable-toggle"
              control={
              <Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}
              label="Enable"
            />
          </Grid>
          <Grid item> 
          <MaterialButton
            className="mr-1.5"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            >
              New Document
            </MaterialButton>
            <MaterialButton
            className="mr-1.5"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => SetDialogOpen2(true)}
            >
              Save
            </MaterialButton>
          
            <Dialog
            open={dialogOpen2}
            onClose={() => SetDialogOpen2(false)}
            fullWidth
            maxWidth="md"
            >
              <DialogTitle id="new title">Add Title</DialogTitle>
              <DialogContent>
                <TextField
                multiline
                fullWidth
                placeholder='Add the name of the Blog'
                size="small"
                value={blogName}
                onChange={e => setBlogName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                  <MaterialButton onClick={() => SetDialogOpen2(false)} color="primary">
                    Cancel
                  </MaterialButton>
                  <MaterialButton
                  onClick={() => {
                    const json = query.serialize();
                    const short = LZUTF8.encodeBase64(LZUTF8.compress(json));
                    setSnackbarMessage2("Blog Saved");
                    setHoldState(short);
                    handleSave();
                    SetDialogOpen2(false)
                  }}
                  color="primary"
                  autofocus
                  >
                    Save
                  </MaterialButton>
                </DialogActions>
            </Dialog>
            <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
            open={!!snackBarMessage2}
            onClose={() => setSnackbarMessage2(null)}
            message={<span>{snackBarMessage2}</span>}
            />


            <MaterialButton
            className="ml-1.5"
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
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                  <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between'>
                    <span>
                      <span className='sm:text-left text-right'>NAME</span>
                    </span>
                  </div>
                  <ul>
                    {data.map(i => {
                      return (
                        <li key={i.name} className="bg-gray-200 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
                          <div className="">
                            <Button fullWidth className='sm:text-left text-right pl-4'
                              onClick={() => {
                                setStateToLoad(i.state)
                                SetDialogOpen(false)
                                console.log(stateToLoad);
                                const json = LZUTF8.decompress(LZUTF8.decodeBase64(i.state))
                                console.log(json);
                                actions.deserialize(json)
                                setSnackbarMessage("State Loaded")
                              }}>
                              {i.name}
                            </Button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                </div>

              </DialogContent>
                <DialogActions>
                <MaterialButton onClick={() => SetDialogOpen(false)} color="primary">
                  Cancel
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
