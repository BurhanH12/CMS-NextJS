// components/Toolbox.js
import React from "react";
import { Box, Typography, Button as MaterialButton, Grid } from "@material-ui/core";
import { Element, useEditor } from "@craftjs/core";
import Text from "./User/Text";
import Button from "./User/Button";
import Container from "./User/Container";
import Card from "./User/Card";
import GridComp from "./User/GridComp";


export const Toolbox = () => {
    const { connectors, query } = useEditor();
    return (
        <Box px={2} py={2} className= "p-3">
            <Grid container direction="column" alignItems="center" justify="center" spacing={1}>
                <Box className="p-1">
                    <Typography>Drag to Add</Typography>
                </Box>
                <Grid container direction="column" item>
                    <MaterialButton ref={ref=> connectors.create(ref, <Button text="Click me" size="small" />)} variant="contained">Button</MaterialButton>
                </Grid>
                <Grid container direction="column" item>
                    <MaterialButton ref={ref=> connectors.create(ref, <Text text="Hi world" />)} variant="contained">Text</MaterialButton>
                </Grid>
                <Grid container direction="column" item>
                    <MaterialButton ref={ref=> connectors.create(ref, <Element is={Container} padding={20} canvas />)} variant="contained">Container</MaterialButton>
                </Grid>
                <Grid container direction="column" item>
                    <MaterialButton ref={ref => connectors.create(ref, <Card />)} variant="contained">Card</MaterialButton>
                </Grid>
                <Grid container direction="column" item>
                    {/* <MaterialButton ref={(ref) => connectors.create(ref,
                                <GridComp>
                                    <Container padding={20} canvas />
                                </GridComp>
                            )
                        }
                        variant="contained"
                    >
                        Grid
                    </MaterialButton> */}
                </Grid>
            </Grid>
        </Box>
    )
};