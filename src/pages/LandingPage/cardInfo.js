import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    TableCell, Paper, Table, TableHead, TableBody, TableRow, TableContainer,
    Accordion, AccordionDetails, Typography, AccordionSummary, List, ListItem, ListItemAvatar, ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardInfo() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [summary, setSummary] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/cards/summary`);
                setSummary(response.data);
            } catch (error) {
                console.error('Failed to fetch card summary:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Button className="btn btn-outline-primary" type="button" vriant onClick={handleClickOpen}>
                <InfoOutlinedIcon />
            </Button>
            {summary ? (
                <Dialog

                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description">
                    <div style={{ minHeight: "10rem", width: "20rem" }} className='container w-100 pt-2 pb-2'>
                        
                        <DialogTitle className='fw-bold'>{"Cards Summary "}</DialogTitle>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionDetails
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                    Number of all card in website : {summary.totalCards}
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion >
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '100%', flexShrink: 0 }}>Type</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {summary.typeCount.map((item) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.count + " Cards"} secondary={item._id} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '100%', flexShrink: 0 }}>Frame Type</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {summary.frameTypeCount.map((item) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.count + " Cards"} secondary={item._id} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '100%', flexShrink: 0 }}>Race</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {summary.raceCount.map((item) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.count + " Cards"} secondary={item._id} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '100%', flexShrink: 0 }}>Attribute</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {summary.attributeCount.map((item) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.count + " Cards"} secondary={item._id} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '100%', flexShrink: 0 }}>levels</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {summary.levelCount.map((item) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.count + " Cards"} secondary={item._id} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <button type="button" onClick={()=>{handleClose()}} class="btn btn-primary m-2">Close</button>
                    </div>
                </Dialog>
            ) :
                (
                    <p>Loading</p>
                )}

        </div>

    )
}
