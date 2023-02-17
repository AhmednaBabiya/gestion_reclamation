import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

function ClientReclamationDetails() {
  let rec_id = localStorage.getItem("rec_id");
  const reclamationURL = `https://reclamation.bmi.mr:8000/backend/reclamation/${rec_id}`;
  const [customer_name, setCustomerName] = useState("");
  const [customer_phone_number, setCustomerPhoneNumber] = useState("");
  const [customer_nni_number, setCustomerNNINumber] = useState("");
  const [identity_card, setIdentityCard] = useState("");
  const [photo, setPhoto] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [last_update, setLastUpdate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const ar = {
    fontFamily: "calibri",
  };
  const fr = {
    fontFamily: "sans-serif",
  };

  useEffect(() => {
    axios
      .get(reclamationURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCustomerName(res.data.customer_name);
        setCustomerPhoneNumber(res.data.customer_phone_number);
        setCustomerNNINumber(res.data.customer_nni_number);
        setIdentityCard(res.data.identity_card);
        setPhoto(res.data.photo);
        setScreenshot(res.data.screenshot);
        setDescription(res.data.description);
        setCreatedAt(
          res.data.created_at.split("T")[0] +
            " " +
            res.data.created_at.split("T")[1].split(".")[0].slice(0, -3)
        );
        setLastUpdate(
          res.data.created_at.split("T")[0] +
            " " +
            res.data.created_at.split("T")[1].split(".")[0].slice(0, -3)
        );
        setType(res.data.type);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleCreate = () => {
    Router.push("/client-rec-create");
  };
  const handleFrench = () => {
    setLanguage("fr");
  };
  const handleArabe = () => {
    setLanguage("ar");
  };

  return (
    <>
      <Head>
        <title style={localStorage.getItem("language") == "fr" ? fr : ar}>
          {language == "fr"
            ? "Details réclamation | Gestion de réclamations"
            : "تفاصيل الشكوى | مصلحة الشكاوى"}
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
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={11} md={7} xs={14}>
              <form>
                <Card>
                  {language == "fr" ? (
                    <CardHeader
                      subheader="Vous ne pouvez pas créer une nouvelle réclamation tant que celle ci n'est pas traitée"
                      title="Détails de votre dernière réclamation"
                    />
                  ) : (
                    <CardHeader
                      titleTypographyProps={{ variant: "inherit" }}
                      dir="rtl"
                      subheader="لا يمكنك إنشاء شكوى جديدة حتى تتم معالجة آخر شكوى"
                      title="تفاصيل الشكوى الأخيرة"
                    />
                  )}

                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          InputProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "Nom" : "الاسم"}
                          name="customer_name"
                          value={customer_name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          InputProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "Numéro de téléphone" : "رقم الهاتف"}
                          name="customer_phone_number"
                          value={customer_phone_number}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          InputProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "NNI" : "رقم الهوية الوطنية"}
                          name="customer_nni_number"
                          value={customer_nni_number}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          InputProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "Date de création" : "تاريخ الإنشاء"}
                          name="created_at"
                          value={created_at}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          InputProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "Type de réclamation" : "نوع الشكوى"}
                          name="type"
                          value={
                            language == "fr"
                              ? type
                              : (type == "Changement de mot de passe" && "تغيير كلمة السر") ||
                                (type == "Déblocage" && "الغاء القفل") ||
                                (type == "Changement de téléphone" && "تغيير الهاتف") ||
                                (type == "Activation" && "التفعيل") ||
                                (type == "Virements" && "التحويلات") ||
                                (type == "Autres" && "آخر")
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          InputProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "Statut de la réclamation" : "حالة الشكوى"}
                          name="status"
                          value={
                            language == "fr"
                              ? status
                              : (status == "Pas encore traitée" && "لم تتم معالجتها بعد") ||
                                (status == "En cours de traitement" && "يتم معالجتها") ||
                                (status == "Traitée" && "تمت معالجتها") ||
                                (status == "Anciennement traitée" && "تمت معالجتها سابقا")
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          InputLabelProps={{ style: { fontFamily: "calibri" } }}
                          fullWidth
                          disabled
                          label={language == "fr" ? "Description" : "وصف الشكوى"}
                          name="description"
                          multiline
                          value={description}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label={
                            language == "fr" ? "Date du dernier mise à jour" : "تاريخ آخر تحديث"
                          }
                          name="customer_nni_number"
                          value={last_update}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div
                          style={localStorage.getItem("language") == "fr" ? fr : ar}
                          dir={language == "fr" ? null : "rtl"}
                        >
                          <a>{language == "fr" ? "Photo" : "الصورة"}</a>
                        </div>
                        <div
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <InnerImageZoom
                            src={photo}
                            style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                          ></InnerImageZoom>
                        </div>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div
                          style={localStorage.getItem("language") == "fr" ? fr : ar}
                          dir={language == "fr" ? null : "rtl"}
                        >
                          <a>{language == "fr" ? `Carte d'identité` : "الهوية الوطنية"}</a>
                        </div>
                        <a></a>
                        <div
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <InnerImageZoom
                            src={identity_card}
                            style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                          ></InnerImageZoom>
                        </div>
                      </Grid>
                      {screenshot && (
                        <Grid item md={6} xs={12}>
                          <div
                            style={localStorage.getItem("language") == "fr" ? fr : ar}
                            dir={language == "fr" ? null : "rtl"}
                          >
                            <a>{language == "fr" ? `Capture d'écran` : "لقطة الشاشة"}</a>
                          </div>
                          <a></a>
                          <div
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <InnerImageZoom
                              src={screenshot}
                              style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                            ></InnerImageZoom>
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    {status === "Clôturée" || status === "Anciennement traitée" ? (
                      <Button
                        style={localStorage.getItem("language") == "fr" ? fr : ar}
                        color="primary"
                        variant="contained"
                        onClick={handleCreate}
                      >
                        {language == "fr" ? "Créer une nouvelle réclamation" : "إنشاء شكوى جديدة"}
                      </Button>
                    ) : (
                      <Button
                        style={localStorage.getItem("language") == "fr" ? fr : ar}
                        color="primary"
                        variant="contained"
                        disabled
                      >
                        {language == "fr" ? "Créer une nouvelle réclamation" : "إنشاء شكوى جديدة"}
                      </Button>
                    )}
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
// ClientReclamationDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default ClientReclamationDetails;
