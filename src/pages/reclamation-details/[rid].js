import React, { useState, useEffect } from "react";
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
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InnerImageZoom from "react-inner-image-zoom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />; //
});

function ReclamationDetails() {
  const router = useRouter();
  const { rid } = router.query;
  const reclamationURL = `https://reclamation.bmi.mr:8000/backend/reclamation/${rid}`;
  const profileURL = "https://reclamation.bmi.mr:8000/backend/profile/me/";
  let tokenStr = localStorage.getItem("token");
  const [customer_name, setCustomerName] = useState("");
  const [customer_phone_number, setCustomerPhoneNumber] = useState("");
  const [customer_nni_number, setCustomerNNINumber] = useState("");
  const [identity_card, setIdentityCard] = useState("");
  const [photo, setPhoto] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [last_update, setLastUpdate] = useState("");
  const [treatment_date, setTreatmentDate] = useState(null);
  const [updated_by, setUpdated_by] = useState(null);
  const [created_by, setCreatedBy] = useState(null);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [is_super_admin, setIsSuperAdmin] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

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
        setOpenSuccess(true);
      })
      .catch((err) => {
        console.log("error message", err);
        setOpenError(true);
      });
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
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);
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
        setCreatedBy(res.data.created_by);
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
          res.data.last_update.split("T")[0] +
            " " +
            res.data.last_update.split("T")[1].split(".")[0].slice(0, -3)
        );
        setUpdated_by(res.data.updated_by);
        setType(res.data.type);
        setStatus(res.data.status);
        setTreatmentDate(
          res.data.treatment_date.split("T")[0] +
            " " +
            res.data.treatment_date.split("T")[1].split(".")[0].slice(0, -3)
        );
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);
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
  console.log("det : ", created_by);
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
                          name="last_updated_at"
                          value={last_update}
                          variant="outlined"
                        />
                      </Grid>
                      {updated_by && (
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            disabled
                            label="Traitée par"
                            name="updated_by"
                            value={updated_by}
                            variant="outlined"
                          />
                        </Grid>
                      )}
                      {created_by && (
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            disabled
                            label="Créer par"
                            name="created_by"
                            value={created_by}
                            variant="outlined"
                          />
                        </Grid>
                      )}
                      {(status == "Traitée" || status == "Clôturée") && (
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            disabled
                            label="date du traitement"
                            name="treatment_date"
                            value={treatment_date}
                            variant="outlined"
                          />
                        </Grid>
                      )}
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
                          {(status == "Clôturée" || status == "Traitée") &&
                          is_super_admin == false ? (
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                disabled
                                label="status"
                                name="status"
                                value={status}
                                variant="outlined"
                              />
                            </Grid>
                          ) : (
                            <>
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
                                {is_super_admin == true && (
                                  <MenuItem value="Clôturée">Clôturée</MenuItem>
                                )}
                              </Select>
                            </>
                          )}
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
                          <InnerImageZoom
                            src={photo}
                            style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                          ></InnerImageZoom>
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
                          <InnerImageZoom
                            src={identity_card}
                            style={{ maxHeight: 160, maxWidth: 300, width: 300 }}
                          ></InnerImageZoom>
                        </div>
                      </Grid>
                      {screenshot && (
                        <Grid item md={6} xs={12}>
                          <a>Capture d&apos;écran</a>
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
      <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Erreur lors de la modification du statut!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        style={{ color: "#AB334B", textAlign: "center" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Statut modifié avec succès!
        </Alert>
      </Snackbar>
    </>
  );
}
ReclamationDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default ReclamationDetails;
