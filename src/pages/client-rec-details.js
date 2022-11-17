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

function ClientReclamationDetails() {
  let rec_id = localStorage.getItem("rec_id");
  const reclamationURL = `https://reclamation.bmi.mr:8000/backend/reclamation/${rec_id}`;
  const [customer_name, setCustomerName] = useState("");
  const [customer_phone_number, setCustomerPhoneNumber] = useState("");
  const [customer_nni_number, setCustomerNNINumber] = useState("");
  const [identity_card, setIdentityCard] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [language, setLanguage] = useState("ar");

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
        setDescription(res.data.description);
        setCreatedAt(
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

  const handleCreate = () => {
    Router.push("/client-rec-create");
  };

  return (
    <>
      <Head>
        <title>
          {language == "fr"
            ? "Details réclamation | Gestion de réclamations"
            : "تفاصيل الشكوى | إدارة المطالبات"}
        </title>
      </Head>
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
                      dir="rtl"
                      subheader="لا يمكنك إنشاء شكوى جديدة حتى يتم تصحيح آخر شكوى"
                      title="تفاصيل الشكوى الأخيرة"
                    />
                  )}

                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
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
                          fullWidth
                          disabled
                          label={language == "fr" ? "Type de réclamation" : "نوع الشكوى"}
                          name="type"
                          value={type}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label={language == "fr" ? "Statut de la réclamation" : "حالة الشكوى"}
                          name="status"
                          value={status}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label={language == "fr" ? "Description" : "وصف الشكوى"}
                          name="description"
                          multiline
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div dir={language == "fr" ? null : "rtl"}>
                          <a>{language == "fr" ? "Photo" : "الصورة"}</a>
                        </div>
                        <div
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <img
                            src={photo}
                            style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                          ></img>
                        </div>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div dir={language == "fr" ? null : "rtl"}>
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
                          <img
                            src={identity_card}
                            style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                          ></img>
                        </div>
                      </Grid>
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
                    {status === "Traitée" ? (
                      <Button color="primary" variant="contained" onClick={handleCreate}>
                        {language == "fr" ? "Créer une nouvelle réclamation" : "إنشاء مطالبة جديدة"}
                      </Button>
                    ) : (
                      <Button color="primary" variant="contained" disabled>
                        {language == "fr" ? "Créer une nouvelle réclamation" : "إنشاء مطالبة جديدة"}
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
