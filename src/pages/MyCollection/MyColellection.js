import { useParams, useNavigate } from "react-router-dom";
import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css"
import Navbar from "../../components/common/navbar/navbar";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Typography, Tabs, Tab, Box } from '@mui/material';
import Tab1Component from "./cardTab";
import Tab2Component from "./deckTab";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const MyCollection = () => {
  const [value, setValue] = React.useState('one');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/profile`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        navigate("/error");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <div className="container p-3">
        <div className="d-flex justify-content-center">
          <CollectionsBookmarkIcon sx={{ fontSize: '2.5rem', marginRight: '0.5rem' }} />
          <Typography variant="h4" component="h4" className="fw-bold">
            My Collection
          </Typography>
        </div>
        <div className="container p-3">
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
              variant="fullWidth"
            >
              <Tab value="one" label="Cards Collection" sx={{ flexGrow: 1, fontSize: '1.1rem', fontWeight: 'bold'}} />
              <Tab value="two" label="Decks Collection" sx={{ flexGrow: 1, fontSize: '1.1rem',fontWeight: 'bold' }} />
            </Tabs>
          </Box>
        </div>
        <div className="container mt-2 p-2">
          <TransitionGroup>
            <CSSTransition
              key={value}
              timeout={300}
              classNames="fade"
            >
              <div>
                {value === 'one' && <Tab1Component id={currentUser._id} />}
                {value === 'two' && <Tab2Component />}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>

      </div>
    </>
  );
};

export default MyCollection;
