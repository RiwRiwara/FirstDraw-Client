import * as React from 'react';
import {
    Dialog, ListItemText, ListItem, List, Container,
    Divider, AppBar, Toolbar, Typography
} from '@mui/material';


export default function FullScreenDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                maxWidth="lg"
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
                <div className='container p-3'>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the
                    1500s, when an unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List>

            </Dialog>
        </div>
    );
}
