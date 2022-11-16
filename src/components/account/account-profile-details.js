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
} from "@mui/material";

export const AccountProfileDetails = (props) => {
  const profileURL = "http://reclamation.bmi.mr/backend/profile/me/";
  let tokenStr = localStorage.getItem("token");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [is_admin, setIsAdmin] = useState(false);

  const handleSave = () => {
    axios
      .put(
        profileURL,
        { first_name, last_name, email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${tokenStr}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log("error message", err);
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
        setFirstName(res.data.first_name), setLastName(res.data.last_name);
        setEmail(res.data.email);
        setIsAdmin(res.data.is_admin);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Les informations peuvent être modifiées" title="Profil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Prénom"
                name="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                value={first_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nom"
                name="last_name"
                onChange={(e) => setLastName(e.target.value)}
                value={last_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Addresse Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Type du compte"
                name="phone"
                disabled
                value={is_admin == true ? "admin" : "consultant"}
                variant="outlined"
              />
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
            Enregistrer les modifications
          </Button>
        </Box>
      </Card>
    </form>
  );
};
