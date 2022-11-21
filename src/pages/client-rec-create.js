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
import axios from "axios";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Header from "../components/header";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />; //
});

const ClientReclamationCreate = () => {
  const baseURL = "https://reclamation.bmi.mr:8000/backend/reclamation-create/";
  const [client_identity, setIdentityCard] = useState(null);
  const [client_photo, setPhoto] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [state, setState] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  let form_data = new FormData();
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
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
      phone: Yup.string().length(8).required("Le numéro du téléphone est requis"),
      nni: Yup.string().length(10).required("Le NNI est requis"),
      type: Yup.string().max(255).required("Le type est requis"),
    }),
    onSubmit: () => {
      setState(true);
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
          localStorage.setItem("rec_id", res.data.id);
          setOpenSuccess(true);
        })
        .catch((err) => {
          setState(false);
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
    Router.push("/client-rec-details");
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handleFrench = () => {
    setLanguage("fr");
  };
  const handleArabe = () => {
    setLanguage("ar");
  };
  console.log("createlanguage", language);
  return (
    <>
      <Head>
        <title>{language == "fr" ? "BMI | Gestion de réclamation" : "BMI | إدارة الشكاوى"}</title>
      </Head>
      {/* <Header language={language} setLanguage={(newLanguage) => setLanguage(newLanguage)} /> */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src="/static/LOGO-SEDAD.svg" style={{ maxWidth: "20%", height: "auto" }}></img>
        {language == "ar" ? (
          <Button size="large" onClick={handleFrench}>
            <a>Français</a>
            <img
              style={{ width: 15, marginTop: 2, marginLeft: 3 }}
              src="/static/Flag-France.png"
            ></img>
          </Button>
        ) : (
          <Button size="large" onClick={handleArabe}>
            <img
              style={{ width: 15, marginTop: 2, marginRight: 3 }}
              src="/static/flag-mauritania.png"
            ></img>
            <a>العربية</a>
          </Button>
        )}
      </div>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography dir={language == "fr" ? null : "rtl"} color="textPrimary" variant="h4">
                {language == "fr" ? "Réclamations" : "إدارة الشكاوى"}
              </Typography>
              <Typography
                dir={language == "fr" ? null : "rtl"}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                {language == "fr"
                  ? "Veuillez remplir le formulaire ci-dessous afin de créer votre réclamation"
                  : "يرجى إكمال النموذج أدناه لإنشاء الشكوى"}
              </Typography>
            </Box>
            <TextField
              dir={language == "fr" ? null : "rtl"}
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label={language == "fr" ? "Nom" : "الاسم"}
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              dir={language == "fr" ? null : "rtl"}
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label={language == "fr" ? "Numéro de téléphone" : "رقم الهاتف"}
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              variant="outlined"
            />
            <TextField
              dir={language == "fr" ? null : "rtl"}
              error={Boolean(formik.touched.nni && formik.errors.nni)}
              fullWidth
              helperText={formik.touched.nni && formik.errors.nni}
              label={language == "fr" ? "Numéro NNI" : "رقم الهوية الوطنية"}
              margin="normal"
              name="nni"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nni}
              variant="outlined"
            />
            <TextField
              dir={language == "fr" ? null : "rtl"}
              error={Boolean(formik.touched.description && formik.errors.description)}
              fullWidth
              multiline
              helperText={formik.touched.description && formik.errors.description}
              label={language == "fr" ? "Description" : "وصف الشكوى"}
              margin="normal"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              variant="outlined"
            />
            <FormControl fullWidth style={{ marginTop: 15 }}>
              <InputLabel>{language == "fr" ? "Type du réclamation" : "نوع الشكوى"}</InputLabel>
              <Select
                required
                dir={language == "fr" ? null : "rtl"}
                labelId="type"
                label="Type du réclamation"
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
              >
                <MenuItem value="Activation" dir={language == "fr" ? null : "rtl"}>
                  {language == "fr" ? "Activation" : "التفعيل"}
                </MenuItem>
                <MenuItem value="Changement de téléphone" dir={language == "fr" ? null : "rtl"}>
                  {language == "fr" ? "Changement de téléphone" : "تغيير الهاتف"}
                </MenuItem>
                <MenuItem value="Déblocage" dir={language == "fr" ? null : "rtl"}>
                  {language == "fr" ? "Déblocage" : "الغاء القفل"}
                </MenuItem>
                <MenuItem value="Changement de mot de passe" dir={language == "fr" ? null : "rtl"}>
                  {language == "fr" ? "Changement de mot de passe" : "تغيير كلمة السر"}
                </MenuItem>
                <MenuItem value="Virements" dir={language == "fr" ? null : "rtl"}>
                  {language == "fr" ? "Virements" : "التحويلات"}
                </MenuItem>
                <MenuItem value="Autres" dir={language == "fr" ? null : "rtl"}>
                  {language == "fr" ? "Autres" : "آخر"}
                </MenuItem>
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
                      {language == "fr" ? "Supprimer" : "حذف"}
                    </Button>
                  </div>
                )}
                <div dir={language == "fr" ? null : "rtl"} style={{ display: "flex" }}>
                  {language == "fr" ? (
                    <InputLabel style={{ marginRight: 93, marginTop: 9 }}>Photo</InputLabel>
                  ) : (
                    <InputLabel style={{ marginLeft: 93, marginTop: 9 }}>الصورة</InputLabel>
                  )}

                  <Input
                    required
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
                      {language == "fr" ? "Supprimer" : "حذف"}
                    </Button>
                  </div>
                )}
                <div
                  dir={language == "fr" ? null : "rtl"}
                  style={{ display: "flex", marginTop: 20, marginBottom: 20 }}
                >
                  {language == "fr" ? (
                    <InputLabel style={{ marginRight: 20, marginTop: 9 }}>
                      Carte d&apos;identité
                    </InputLabel>
                  ) : (
                    <InputLabel style={{ marginLeft: 45, marginTop: 9 }}>الهوية الوطنية</InputLabel>
                  )}
                  <Input
                    required
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
              <LoadingButton
                color="primary"
                fullWidth
                loading={state}
                size="large"
                type="submit"
                loadingPosition={language == "fr" ? "end" : "start"}
                endIcon={<SendIcon />}
                variant="contained"
              >
                {language == "fr" ? "Créer la réclamation" : "إنشاء الشكوى"}
              </LoadingButton>
            </Box>
          </form>
        </Container>
      </Box>
      <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {language == "fr"
            ? "Erreur lors de la création de votre réclamation, Veuillez vous assurer d'avoir les champs necéssaires"
            : "خطأ عند إنشاء الشكوى ، يرجى التأكد من ملء الحقول اللازمة"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        style={{ color: "#AB334B", textAlign: "center" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {language == "fr" ? "Votre réclamation a été crée avec succès" : "تم إنشاء الشكوى بنجاح"}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ClientReclamationCreate;
