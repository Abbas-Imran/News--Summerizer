import React, { useState, useEffect } from "react"; // Import useEffect
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import formatRelativeTime from "../functions/timeConverter";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function NewsCard(props) {
  const { eachNews } = props;
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {

    setOpen(true);
    setIsLoading(true);

    fetch('http://localhost:4000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: eachNews.url,
        title: eachNews.title
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setResponse(data.response);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box>
        <img
          src={eachNews.urlToImage}
          width="100%"
          style={{ objectFit: "cover", height: "250px" }}
          alt="News"
        />
        <h2>{eachNews.title}</h2>
        <p>{eachNews.description}</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <p style={{ marginBottom: "0px" }}>{eachNews.author}</p>
          <p style={{ marginTop: "0px" }}>
            {formatRelativeTime(eachNews.publishedAt)}
          </p>
        </Box>
        <Box>
          <Button variant="outlined" onClick={handleOpen}>Summarize</Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {eachNews.title}
          </Typography>
          {isLoading ? (
            <CircularProgress sx={{ mt: 2 ,display:"block"}} />
          ) : (
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {response}
            </Typography>
          )}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Grid>
  );
}

export default NewsCard;
