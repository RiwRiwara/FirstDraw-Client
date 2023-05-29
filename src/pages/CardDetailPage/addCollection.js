import {
    Dialog, List, Stack, FormControl, InputLabel, Snackbar,
    Card, CardActions, CardContent, CardMedia, Select, Tooltip, Zoom,
    Divider, AppBar, Toolbar, Typography, Paper, Button, MenuItem, Grid, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FullScreenDialog(props) {
    const user = JSON.parse(localStorage.getItem("user")).data;
    const userID = user.user._id
    const [open, setOpen] = useState(false);
    const [ShowAlert, setShowAlert] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [lencardCollection, setlencardCollection] = useState(0);
    const [isOwnCard, setIsOwnCard] = useState(false);
    const [collectionId, setCollectionId] = useState();

    useEffect(() => {
        setLoading(true);
        const fetchCollection = async () => {
            try {

                const collectionResponse = await axios.get(`${process.env.REACT_APP_API}/collections`, {
                    params: {
                        userId: userID,
                        type: "card"
                    }
                });

                if (!collectionResponse.data[0]) {
                    try {
                        const createCollection = await axios.post(`${process.env.REACT_APP_API}/collections`, {
                            userId: userID,
                            collection_name: 'card-collection',
                            itemIds: [],
                            typeCollect: 'card'
                        });

                        console.log(createCollection.data);
                    }
                    catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                    fetchCollection();
                    // return;
                }
                setCollectionId(collectionResponse.data[0]._id)
                setlencardCollection(collectionResponse.data[0].itemIds.length)
                if (collectionResponse.data[0].itemIds.includes(props.card._id)) {
                    setIsOwnCard(true)
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, [props, isOwnCard]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAction = () => {
        setShowAlert(false);
    };
    const handleClickAction = () => {
        setShowAlert(true);
    };

    const [nCard, setnCard] = useState(0);

    const handleChange = (e) => {
        setnCard(Number(e))
    };

    const deleteItemFromCollection = async (itemId) => {

        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/collections/${collectionId}`, {
                removeItems: [itemId],
            });

            handleClickAction()
            setIsOwnCard(false)

        } catch (error) {
            console.error(error);
        }


    };
    const addItemToCollection = async (itemId) => {

        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/collections/${collectionId}`, {
                addItems: [itemId],
            });

            handleClickAction()
            setIsOwnCard(true)

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='container'>
                <button type="button" className="btn btn-primary fw-bold w-100" onClick={handleClickOpen}>
                    Add to collection
                </button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <AppBar sx={{ position: 'relative' }} className='bg-primary'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" component="div" className='fw-bold text-white'>
                            My Collection
                        </Typography>
                        <button type="button" className="btn btn-primary" onClick={handleClose}>Close</button>
                    </Toolbar>

                </AppBar>
                <h3 className='fw-bold p-2'>Card Collection</h3>
                <List className='p-2 m-1'>
                    <Stack direction="row" spacing={2}>
                        <Item className='fw-bold text-primary'>Space: {lencardCollection}/100</Item>
                        <Tooltip title={isOwnCard ? "You already have this card in collection" : ""} TransitionComponent={Zoom} placement="top">
                            <button
                                type="button"
                                className={`btn btn-${isOwnCard ? "danger" : "primary"}`}
                                onClick={() => {
                                    if (isOwnCard) {
                                        deleteItemFromCollection(props.card._id);
                                    } else {
                                        addItemToCollection(props.card._id);
                                    }
                                }}

                            >
                                {isOwnCard ? "Remove card from collection" : "Add card from collection"}
                            </button>
                        </Tooltip>


                    </Stack>
                </List>
                <Divider />
                <h3 className='fw-bold p-2'>Deck Collection</h3>
                <div>
                    <Card sx={{ maxWidth: '100%', margin: "1rem" }}>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="https://firstdraw.blob.core.windows.net/cardimgs/70832512.jpg"
                            title="deck"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Deck for counter trap and spells.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                <Grid item xs={6} sm={6} md={4}>
                                    <div className="fw-bold text-primary">Space: 10/40</div>
                                </Grid>
                                <Grid item xs={6} sm={6} md={4}>
                                    <FormControl sx={{ minWidth: 120 }} size="small" className='w-100'>
                                        <InputLabel id="demo-select-small-label">Number of Cards</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={nCard}
                                            label="Cards"
                                            onChange={(e) => handleChange(e.target.value)}
                                        >
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Button variant="contained" color="primary" onClick={(e) => { console.log(e) }} className='w-100'>
                                        Add card to Deck
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardActions>
                    </Card>


                </div>
                <Divider />
                <Snackbar open={ShowAlert} autoHideDuration={6000} onClose={handleCloseAction}>
                    <Alert onClose={handleCloseAction} severity={!isOwnCard ? "error" : "success"} sx={{ width: '100%' }}>
                        {!isOwnCard ? "Card removed from" : "Add card to"} collection!
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
}
