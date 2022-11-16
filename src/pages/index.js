import Head from "next/head";
import Router from "next/router";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const ReclamationCreate = () => {
  const baseURL = "http://reclamation.bmi.mr/backend/reclamation-list/";
  const [reclamations, setReclamations] = useState([]);
  let phone_number = null;
  let match = false;

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        setReclamations(response.data);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);

  const handleNumber = () => {
    reclamations.map((r) => {
      if (r.customer_phone_number == phone_number) {
        localStorage.setItem("rec_id", r.id);
        match = true;
      }
    });
    if (match == true) {
      Router.push("/client-rec-details");
    } else {
      Router.push("/client-rec-create");
    }
  };
  return (
    <>
      <Head>
        <title>BMI | Gestion de réclamation</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Gestion de réclamations
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {`Bienvenue dans la gestion de réclamations de BMI.\n
                Veuillez entrer votre numéro de téléphone afin de poursuivre`}
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Numéro téléphone"
            margin="normal"
            name="phone"
            type="number"
            onChange={(e) => (phone_number = e.target.value)}
            value={phone_number}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              onClick={() => handleNumber()}
            >
              Continuer
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ReclamationCreate;
