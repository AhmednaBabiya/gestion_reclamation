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
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";

function ReclamationDetails() {
  const router = useRouter();
  const { rid } = router.query;
  const reclamationURL = `http://127.0.0.1:8000/backend/reclamation/${rid}`;
  let tokenStr = localStorage.getItem("token");
  const [customer_name, setCustomerName] = useState("");
  const [customer_phone_number, setCustomerPhoneNumber] = useState("");
  const [customer_nni_number, setCustomerNNINumber] = useState("");
  const [identity_card, setIdentityCard] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [last_update, setLastUpdate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    axios
      .put(
        reclamationURL + "/update-delete",
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${tokenStr}`,
          },
        }
      )
      .then((res) => {
        Router.push("/reclamations");
      })
      .catch((err) => {
        console.log("error message", err);
      });
  };
  useEffect(() => {
    axios
      .get(reclamationURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${tokenStr}`,
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
        setLastUpdate(
          res.data.last_update.split("T")[0] +
            " " +
            res.data.last_update.split("T")[1].split(".")[0].slice(0, -3)
        );
        setType(res.data.type);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);

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
                    subheader="Les informations peuvent être modifiées par un profil de type admin"
                    title="Détails de la réclamation"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="nom du client"
                          name="customer_name"
                          value={customer_name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="Numéro de téléphone du client"
                          name="customer_phone_number"
                          value={customer_phone_number}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="NNI du client"
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
                          label="date du dernière mis à jour"
                          name="customer_nni_number"
                          value={last_update}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="type"
                          name="type"
                          value={type}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            fullWidth
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                          >
                            <MenuItem value="En cours de traitement">
                              En cours de traitement
                            </MenuItem>
                            <MenuItem value="Traitée">Traitée</MenuItem>
                            <MenuItem value="Pas encore traitée">Pas encore traitée</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled
                          label="description"
                          name="description"
                          multiline
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
                    <Button color="primary" variant="contained" onClick={handleSave}>
                      Enregistrer la modification
                    </Button>
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
ReclamationDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default ReclamationDetails;
