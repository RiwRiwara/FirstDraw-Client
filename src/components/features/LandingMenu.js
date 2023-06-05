import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img1 from "../../assets/images/landing1.png";
import img2 from "../../assets/images/landing2.png";
import img3 from "../../assets/images/landing3.png";
import img4 from "../../assets/images/landing4.png";
import "./feature.css"

export default function LandingMenu() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={1} columns={{ xs: 6, sm: 6, md: 6 }}>
      <Grid item xs={3} sm={3} md={3}>
        <Card onClick={() => navigate("/collections")} className='l1'>
          <CardActionArea>
            <CardMedia component="img" height="140" image={img1} alt="Image 1" />
            <div className="overlayF">
              <Typography className="textF fw-bold">My Collection</Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Card onClick={() => navigate("/request")}className='l1'>
          <CardActionArea>
            <CardMedia component="img" height="140" image={img2} alt="Image 2" />
            <div className="overlayF">
              <Typography className="textF fw-bold">Request Card</Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Card onClick={() => navigate("/profile")}className='l1'>
          <CardActionArea>
            <CardMedia component="img" height="140" image={img3} alt="Image 3" />
            <div className="overlayF">
              <Typography className="textF fw-bold">My Profile</Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Card onClick={() => navigate("/blogs")}className='l1'>
          <CardActionArea>
            <CardMedia component="img" height="140" image={img4} alt="Image 4" />
            <div className="overlayF">
              <Typography className="textF fw-bold">Blog & News</Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
