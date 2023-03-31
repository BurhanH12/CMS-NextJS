import React, { Component, useEffect, useState } from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';

import { SettingsPanel } from 'components/SettingsPanel';
import { Toolbox } from 'components/Toolbox';

import Button from 'components/User/Button';
import Container from 'components/User/Container';
import  Card from 'components/User/Card';
import Topbar from 'components/TopBar';
import GridComp from 'components/User/GridComp';
import { Editor, Element, Frame, NodeElement } from '@craftjs/core';
import Text from 'components/User/Text';
import { CardBottom, CardTop } from 'components/User/Card';
import LZUTF8 from 'lzutf8';



const orders = () => {
    const [enabled, setEnabled] = useState(true)
    const [json, setJson] = useState(null)

    const myFunction = async () => {

        const stateToLoad = await fetch("your api to get compressed data");
        const base64String = await stateToLoad.text();
        const compressedJson = LZUTF8.decodeBase64(base64String.trim());
        const json = LZUTF8.decompress(compressedJson);
        setJson(json);
    };

    //load save state from server on page
    useEffect(() => {
        myFunction();
        
    }, []);


    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='p-4 justify-between flex px-4'>
                <h2>CraftJS</h2>
                <h2>Welcome, Burhan</h2>
            </div>
            <div className='p-6'>
                <div className='mx-auto '>
                    <Typography variant='h6' align='center'> A super simple page editor </Typography>
                    <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom, GridComp }}
                        enabled={enabled}
                    >
                        <div className='p-2'>
                            <Topbar />
                        </div>
                        <Grid container spacing={3} className="pt-1">
                            <Grid item xs>
                                <Frame json={json}>
                                    <Element is={Container} padding={5} background="#eee" canvas>
                                        <Card padding={15}/>
                                        <Button size="small" variant="outlined">Click Me</Button>
                                        <Text size="small" text="Hi World" />
                                        <Element is={Container} padding={6} background="#999">
                                            <Text fontSize="small" text="It's Me Again" /> 
                                        </Element>
                                        {/* <GridComp>
                                            <Container padding={20} canvas/>
                                        </GridComp> */}
                                    </Element>
                                </Frame>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className="order-last">
                                    <Toolbox />
                                    <SettingsPanel />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Editor>
                </div>


            </div>
        </div>
    )
}


export default orders