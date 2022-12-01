import Head from "next/head";
import Router from "next/router";
import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useFormik } from "formik";
import * as Yup from "yup";

const ReclamationCreate = () => {
  const baseURL = "https://reclamation.bmi.mr:8000/backend/reclamation-list/";
  const [reclamations, setReclamations] = useState([]);
  //localStorage.setItem("language", "fr");
  const ar = {
    fontFamily: "calibri",
  };
  const fr = {
    fontFamily: "sans-serif",
  };
  const [language, setLanguage] = useState("fr");
  let match = false;
  useEffect(() => {
    axios
      .get(baseURL, {
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
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  const formik = useFormik({
    initialValues: {
      phone: "",
      phoneAR: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().length(8, "Le numéro doit etre composé de 8 chiffres"),
      phoneAR: Yup.string().length(8, "يجب أن يتكون رقم الهاتف من 8 أرقام"),
    }),
    onSubmit: () => {
      reclamations.map((r) => {
        if (
          r.customer_phone_number == formik.values.phone ||
          r.customer_phone_number == formik.values.phoneAR
        ) {
          localStorage.setItem("rec_id", r.id);
          match = true;
        }
      });
      if (match == true) {
        Router.push("/client-rec-details");
      } else {
        Router.push("/client-rec-create");
      }
    },
  });
  console.log("phone : ", formik.values.phone);
  console.log("phoneAR : ", formik.values.phoneAR);
  console.log("match : ", match);
  const handleFrench = () => {
    setLanguage("fr");
    formik.values.phoneAR = "";
  };
  const handleArabe = () => {
    setLanguage("ar");
    formik.values.phone = "";
  };
  return (
    <>
      <Head>
        <title>{language == "fr" ? "BMI | Gestion de réclamation" : "BMI | مصلحة الشكاوى"}</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -28,
        }}
      >
        <img src="/static/LOGO-SEDAD.svg" style={{ maxWidth: "20%", height: "auto" }}></img>
        {language == "ar" ? (
          <Button size="large" onClick={() => handleFrench()}>
            <a>Français</a>
            <img
              style={{ width: 15, marginTop: 2, marginLeft: 3 }}
              src="/static/Flag-France.png"
            ></img>
          </Button>
        ) : (
          <Button size="large" onClick={() => handleArabe()}>
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
          <Box sx={{ my: 3 }}>
            {language == "fr" ? (
              <Typography color="textPrimary" variant="h4">
                Gestion de réclamations
              </Typography>
            ) : (
              <Typography
                dir="rtl"
                color="textPrimary"
                variant="h4"
                style={{ fontFamily: "calibri" }}
              >
                مصلحة الشكاوى
              </Typography>
            )}
            {language == "fr" ? (
              <Typography color="textSecondary" gutterBottom variant="body2">
                {`Bienvenue dans la gestion de réclamations de BMI.\n
                Veuillez entrer votre numéro de téléphone afin de poursuivre`}
              </Typography>
            ) : (
              <Typography
                dir="rtl"
                color="textSecondary"
                gutterBottom
                variant="body2"
                style={{ fontFamily: "calibri" }}
              >
                {`مرحبًا بكم في مصلحة الشكاوى "SEDAD".\n الرجاء إدخال رقم هاتفك للمتابعة`}
              </Typography>
            )}
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              {language == "fr" ? (
                <TextField
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
            </FormControl>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                style={localStorage.getItem("language") == "fr" ? fr : ar}
              >
                {language == "fr" ? "Continuer" : "استمرار"}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default ReclamationCreate;
