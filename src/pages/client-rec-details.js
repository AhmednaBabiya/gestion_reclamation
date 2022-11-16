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
        <title>Details réclamation | Gestion de réclamations</title>
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
                  <CardHeader
                    subheader="Vous ne pouvez pas créer une nouvelle réclamation tant que celle ci n'est pas traitée"
                    title="Détails de votre dernière réclamation"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="nom"
                          name="customer_name"
                          value={customer_name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="Numéro de téléphone"
                          name="customer_phone_number"
                          value={customer_phone_number}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="NNI"
                          name="customer_nni_number"
                          value={customer_nni_number}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="date de création"
                          name="created_at"
                          value={created_at}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="type de réclamation"
                          name="type"
                          value={type}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="statut de la réclamation"
                          name="status"
                          value={status}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="description"
                          name="description"
                          multiline
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <a>Photo du client</a>
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
                        <a>Carte d&apos;identité</a>
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
                        Créer une nouvelle réclamation
                      </Button>
                    ) : (
                      <Button color="primary" variant="contained" disabled>
                        Créer une nouvelle réclamation
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
