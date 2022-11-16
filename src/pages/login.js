import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const Login = () => {
  const baseURL = "http://reclamation.bmi.mr/account/login/";
  const token = "";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Doit être un email valide")
        .max(255)
        .required("L'e-mail est requis"),
      password: Yup.string().max(255).required("Mot de passe requis"),
    }),
    onSubmit: () => {
      axios
        .post(
          baseURL,
          {
            username: formik.values.email,
            password: formik.values.password,
          },
          {
            "Content-Type": "application/json, multipart/form-data",
          }
        )
        .then((res) => {
          token = res.data.token;
          localStorage.setItem("token", token);
          Router.push("/reclamations");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Connexion | Gestion de réclamation</title>
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
          {/* <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                S&apos;identifier
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Connectez-vous sur la plateforme interne
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Connectez vous maintenant
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Vous n&apos;avez pas de compte?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  S&apos;inscrire
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
