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
  const profileURL = "https://reclamation.bmi.mr:8000/backend/profile/me/";
  const ReclamationsURL = "https://reclamation.bmi.mr:8000/backend/reclamation-list/";
  const [client_identity, setIdentityCard] = useState(null);
  const [client_photo, setPhoto] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [state, setState] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const [reclamations, setReclamations] = useState([]);
  const [is_admin, setIsAdmin] = useState(false);
  const [is_super_admin, setIsSuperAdmin] = useState(false);
  let tokenStr = localStorage.getItem("token");
  let match = false;
  const ar = {
    fontFamily: "calibri",
  };
  const fr = {
    fontFamily: "sans-serif",
  };
  useEffect(() => {
    axios
      .get(profileURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${tokenStr}`,
        },
      })
      .then((res) => {
        setIsSuperAdmin(res.data.is_super_admin);
        setIsAdmin(res.data.is_admin);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(ReclamationsURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setReclamations(response.data);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);
  let form_data = new FormData();
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      phoneAR: "",
      nni: "",
      nniAR: "",
      description: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255),
      phone: Yup.string().length(8, "Le numéro doit etre composé de 8 chiffres"),
      phoneAR: Yup.string().length(8, "يجب أن يتكون رقم الهاتف من 8 أرقام"),
      nni: Yup.string().length(10, "Le NNI doit etre composé de 10 chiffres"),
      nniAR: Yup.string().length(10, "يجب أن يتكون الرقم الوطني للتعريف من 10 أرقام"),
      type: Yup.string().max(255),
    }),
    onSubmit: () => {
      setState(true);
      form_data.append("customer_name", formik.values.name);
      form_data.append("identity_card", client_identity, client_identity.name);
      form_data.append("photo", client_photo, client_photo.name);
      if (screenshot != null) {
        form_data.append("screenshot", screenshot);
      }
      form_data.append("description", formik.values.description);
      form_data.append("type", formik.values.type);
      if (language == "fr") {
        form_data.append("customer_phone_number", formik.values.phone);
        form_data.append("customer_nni_number", formik.values.nni);
      } else {
        form_data.append("customer_phone_number", formik.values.phoneAR);
        form_data.append("customer_nni_number", formik.values.nniAR);
      }
      // reclamations.map((r) => {
      //   if (
      //     r.customer_phone_number == formik.values.phone ||
      //     r.customer_phone_number == formik.values.phoneAR
      //   ) {
      //     localStorage.setItem("rec_id", r.id);
      //     match = true;
      //   }
      // });
      // if (match == true) {
      //   Router.push("/client-rec-details");
      // } else {
      //   axios
      //     .post(baseURL, form_data, {
      //       "Content-Type": "application/json, multipart/form-data",
      //     })
      //     .then((res) => {
      //       localStorage.setItem("rec_id", res.data.id);
      //       setOpenSuccess(true);
      //     })
      //     .catch((err) => {
      //       setState(false);
      //       setOpenError(true);
      //       console.log(err);
      //     });
      // }
      if (tokenStr) {
        axios
          .post(baseURL, form_data, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Token ${tokenStr}`,
            },
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
      } else {
        axios
          .post(baseURL, form_data, {
            "Content-Type": "multipart/form-data",
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
      }
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
    formik.values.phoneAR = "";
    formik.values.nniAR = "";
  };
  const handleArabe = () => {
    setLanguage("ar");
    formik.values.phone = "";
    formik.values.nni = "";
  };
  return (
    <>
      <Head>
        <title style={localStorage.getItem("language") == "fr" ? fr : ar}>
          {language == "fr" ? "BMI | Gestion de réclamation" : "BMI | مصلحة الشكاوى"}
        </title>
      </Head>
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
              style={{ width: 15, marginTop: 2, marginRight: 3, fontFamily: "calibri" }}
              src="/static/Flag-Mauritania.png"
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
              <Typography
                style={localStorage.getItem("language") == "fr" ? fr : ar}
                dir={language == "fr" ? null : "rtl"}
                color="textPrimary"
                variant="h4"
              >
                {language == "fr" ? "Réclamations" : "مصلحة الشكاوى"}
              </Typography>
              <Typography
                dir={language == "fr" ? null : "rtl"}
                color="textSecondary"
                gutterBottom
                variant="body2"
                style={localStorage.getItem("language") == "fr" ? fr : ar}
              >
                {language == "fr"
                  ? "Veuillez remplir le formulaire ci-dessous afin de créer votre réclamation"
                  : "يرجى إكمال النموذج أدناه لإنشاء الشكوى"}
              </Typography>
            </Box>
            <TextField
              InputLabelProps={{ style: { fontFamily: "calibri" } }}
              dir={language == "fr" ? null : "rtl"}
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              required
              helperText={formik.touched.name && formik.errors.name}
              label={language == "fr" ? "Nom" : "الاسم"}
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            {language == "fr" ? (
              <TextField
                dir={language == "fr" ? null : "rtl"}
                InputLabelProps={{ style: { fontFamily: "calibri" } }}
                fullWidth
                required
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                label={language == "fr" ? "Numéro téléphone" : "رقم الهاتف"}
                margin="normal"
                name="phone"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                variant="outlined"
              />
            ) : (
              <TextField
                dir={language == "fr" ? null : "rtl"}
                InputLabelProps={{ style: { fontFamily: "calibri" } }}
                fullWidth
                required
                error={Boolean(formik.touched.phoneAR && formik.errors.phoneAR)}
                helperText={formik.touched.phoneAR && formik.errors.phoneAR}
                label={language == "fr" ? "Numéro téléphone" : "رقم الهاتف"}
                margin="normal"
                name="phoneAR"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneAR}
                variant="outlined"
              />
            )}
            {language == "fr" ? (
              <TextField
                dir={language == "fr" ? null : "rtl"}
                InputLabelProps={{ style: { fontFamily: "calibri" } }}
                error={Boolean(formik.touched.nni && formik.errors.nni)}
                fullWidth
                required
                helperText={formik.touched.nni && formik.errors.nni}
                label={language == "fr" ? "Numéro NNI" : "الرقم الوطني للتعريف"}
                margin="normal"
                name="nni"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nni}
                variant="outlined"
              />
            ) : (
              <TextField
                dir={language == "fr" ? null : "rtl"}
                InputLabelProps={{ style: { fontFamily: "calibri" } }}
                error={Boolean(formik.touched.nniAR && formik.errors.nniAR)}
                fullWidth
                required
                helperText={formik.touched.nniAR && formik.errors.nniAR}
                label={language == "fr" ? "Numéro NNI" : "الرقم الوطني للتعريف"}
                margin="normal"
                name="nniAR"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nniAR}
                variant="outlined"
              />
            )}
            <TextField
              dir={language == "fr" ? null : "rtl"}
              InputLabelProps={{ style: { fontFamily: "calibri" } }}
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
              <InputLabel style={{ fontFamily: "calibri" }}>
                {language == "fr" ? "Type du réclamation" : "نوع الشكوى"}
              </InputLabel>
              <Select
                style={localStorage.getItem("language") == "fr" ? fr : ar}
                required
                dir={language == "fr" ? null : "rtl"}
                labelId="type"
                label="Type du réclamation"
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
              >
                <MenuItem
                  style={{ fontFamily: "calibri" }}
                  value="Activation"
                  dir={language == "fr" ? null : "rtl"}
                >
                  {language == "fr" ? "Activation" : "التفعيل"}
                </MenuItem>
                <MenuItem
                  style={{ fontFamily: "calibri" }}
                  value="Changement de téléphone"
                  dir={language == "fr" ? null : "rtl"}
                >
                  {language == "fr" ? "Changement de téléphone" : "تغيير الهاتف"}
                </MenuItem>
                <MenuItem
                  style={{ fontFamily: "calibri" }}
                  value="Déblocage"
                  dir={language == "fr" ? null : "rtl"}
                >
                  {language == "fr" ? "Déblocage" : "الغاء القفل"}
                </MenuItem>
                <MenuItem
                  style={{ fontFamily: "calibri" }}
                  value="Changement de mot de passe"
                  dir={language == "fr" ? null : "rtl"}
                >
                  {language == "fr" ? "Changement de mot de passe" : "تغيير كلمة السر"}
                </MenuItem>
                <MenuItem
                  style={{ fontFamily: "calibri" }}
                  value="Virements"
                  dir={language == "fr" ? null : "rtl"}
                >
                  {language == "fr" ? "Virements" : "التحويلات"}
                </MenuItem>
                <MenuItem
                  style={{ fontFamily: "calibri" }}
                  value="Autres"
                  dir={language == "fr" ? null : "rtl"}
                >
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
                      style={localStorage.getItem("language") == "fr" ? fr : ar}
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
                    <InputLabel style={{ marginLeft: 93, marginTop: 9, fontFamily: "calibri" }}>
                      الصورة
                    </InputLabel>
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
                      style={localStorage.getItem("language") == "fr" ? fr : ar}
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
                    <InputLabel style={{ marginLeft: 45, marginTop: 9, fontFamily: "calibri" }}>
                      الهوية الوطنية
                    </InputLabel>
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
              <div>
                {(is_admin == true || is_super_admin == true) && screenshot && (
                  <div style={{ marginTop: 20, marginRight: 10 }}>
                    <img
                      alt="not found"
                      width={"350px"}
                      height={"180px"}
                      src={URL.createObjectURL(screenshot)}
                    />
                    <br />
                    <Button
                      style={localStorage.getItem("language") == "fr" ? fr : ar}
                      color="primary"
                      size="small"
                      variant="contained"
                      onClick={() => setScreenshot(null)}
                    >
                      {language == "fr" ? "Supprimer" : "حذف"}
                    </Button>
                  </div>
                )}
                {(is_admin == true || is_super_admin == true) && (
                  <div
                    dir={language == "fr" ? null : "rtl"}
                    style={{ display: "flex", marginTop: 20, marginBottom: 20 }}
                  >
                    {language == "fr" ? (
                      <InputLabel style={{ marginRight: 20, marginTop: 9 }}>
                        Capture d&apos;écran
                      </InputLabel>
                    ) : (
                      <InputLabel style={{ marginLeft: 45, marginTop: 9, fontFamily: "calibri" }}>
                        لقطة الشاشة
                      </InputLabel>
                    )}
                    <Input
                      color="primary"
                      type="file"
                      name="screenshot"
                      onChange={(event) => {
                        setScreenshot(event.target.files[0]);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <Box sx={{ py: 2 }}>
              <LoadingButton
                style={localStorage.getItem("language") == "fr" ? fr : ar}
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
        <Alert
          onClose={handleCloseError}
          severity="error"
          style={localStorage.getItem("language") == "fr" ? fr : ar}
        >
          {language == "fr"
            ? "Erreur lors de la création de votre réclamation, Veuillez vous assurer d'avoir remplir les champs necéssaires et que vous n'aviez pas de reclamation en cours de traitement"
            : "خطأ عند إنشاء الشكوى ، يرجى التأكد من ملء الحقول اللازمة"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        style={{ color: "#AB334B", textAlign: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          style={localStorage.getItem("language") == "fr" ? fr : ar}
        >
          {language == "fr" ? "Votre réclamation a été crée avec succès" : "تم إنشاء الشكوى بنجاح"}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ClientReclamationCreate;
