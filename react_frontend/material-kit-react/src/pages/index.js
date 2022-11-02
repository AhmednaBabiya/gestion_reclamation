import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />; //
});

const ReclamationCreate = () => {
  const baseURL = "http://127.0.0.1:8000/backend/reclamation-create/";
  const token = "";
  const [client_identity, setIdentityCard] = useState(null);
  const [client_photo, setPhoto] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  let form_data = new FormData();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      nni: "",
      description: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Le nom est requis"),
      phone: Yup.string().max(8).required("Le numéro du téléphone est requis"),
      nni: Yup.string().max(10).required("Le NNI est requis"),
      type: Yup.string().max(255).required("Le type est requis"),
    }),
    onSubmit: () => {
      form_data.append("customer_name", formik.values.name);
      form_data.append("customer_phone_number", formik.values.phone);
      form_data.append("customer_nni_number", formik.values.nni);
      form_data.append("identity_card", client_identity, client_identity.name);
      form_data.append("photo", client_photo, client_photo.name);
      form_data.append("description", formik.values.description);
      form_data.append("type", formik.values.type);
      axios
        .post(baseURL, form_data, {
          "Content-Type": "application/json, multipart/form-data",
        })
        .then((res) => {
          setOpenSuccess(true);
        })
        .catch((err) => {
          setOpenError(true);
          console.log(err);
        });
    },
  });
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    Router.push("/reclamations");
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
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
          {/* <NextLink href="/reclamations" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Réclamations
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Veuillez remplir le formulaire ci-dessous afin de créer votre réclamation
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nom"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Téléphone"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.nni && formik.errors.nni)}
              fullWidth
              helperText={formik.touched.nni && formik.errors.nni}
              label="Numéro NNI"
              margin="normal"
              name="nni"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nni}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.description && formik.errors.description)}
              fullWidth
              multiline
              helperText={formik.touched.description && formik.errors.description}
              label="Description"
              margin="normal"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              variant="outlined"
            />
            <FormControl fullWidth style={{ marginTop: 15 }}>
              <InputLabel>Type du réclamation</InputLabel>
              <Select
                labelId="type"
                fullWidth
                label="Type du réclamation"
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
              >
                <MenuItem value="Activation">Activation</MenuItem>
                <MenuItem value="Changement de téléphone">Changement de téléphone</MenuItem>
                <MenuItem value="Déblocage">Déblocage</MenuItem>
                <MenuItem value="Changement de mot de passe">Changement de mot de passe</MenuItem>
                <MenuItem value="Virements">Virements</MenuItem>
                <MenuItem value="Autres">Autres</MenuItem>
              </Select>
            </FormControl>
            <div>
              <br />
              <div>
                {client_photo && (
                  <div style={{ marginTop: 20 }}>
                    <img
                      alt="not found"
                      width={"350px"}
                      height={"180px"}
                      src={URL.createObjectURL(client_photo)}
                    />
                    <br />
                    <Button
                      color="primary"
                      size="small"
                      variant="contained"
                      onClick={() => setPhoto(null)}
                    >
                      Supprimer
                    </Button>
                  </div>
                )}
                <div style={{ display: "flex" }}>
                  <InputLabel style={{ marginRight: 93, marginTop: 9 }}>Photo</InputLabel>
                  <Input
                    type="file"
                    name="photo"
                    onChange={(event) => {
                      setPhoto(event.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div>
                {client_identity && (
                  <div style={{ marginTop: 20, marginRight: 10 }}>
                    <img
                      alt="not found"
                      width={"350px"}
                      height={"180px"}
                      src={URL.createObjectURL(client_identity)}
                    />
                    <br />
                    <Button
                      color="primary"
                      size="small"
                      variant="contained"
                      onClick={() => setIdentityCard(null)}
                    >
                      Supprimer
                    </Button>
                  </div>
                )}
                <div style={{ display: "flex", marginTop: 20, marginBottom: 20 }}>
                  <InputLabel style={{ marginRight: 20, marginTop: 9 }}>
                    Carte d&apos;identité
                  </InputLabel>
                  <Input
                    color="primary"
                    type="file"
                    name="identity_card"
                    onChange={(event) => {
                      setIdentityCard(event.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Créer la réclamation
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Erreur lors de la création de votre réclamation, Veuillez vous assurer d&apos;avoir
          remplir les champs necéssaires
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSuccess}
        style={{ color: "#AB334B", textAlign: "center" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Votre réclamation a été crée avec succès
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReclamationCreate;
