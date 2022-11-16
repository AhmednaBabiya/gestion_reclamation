import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = () => {
  const baseURL = "http://reclamation.bmi.mr:8000/account/register/";
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Doit être un email valide")
        .max(255)
        .required("L'e-mail est requis"),
      first_name: Yup.string().max(255).required("Le prénom est requis"),
      last_name: Yup.string().max(255).required("Le nom est requis"),
      password: Yup.string().max(255).required("Mot de passe requis"),
      confirm_password: Yup.string()
        .max(255)
        .required("La confirmation mot de passe de est requise"),
    }),
    onSubmit: () => {
      axios
        .post(
          baseURL,
          {
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            email: formik.values.email,
            password: formik.values.password,
            confirm_password: formik.values.confirm_password,
          },
          {
            "Content-Type": "application/json, multipart/form-data",
          }
        )
        .then((res) => {
          Router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <Head>
        <title>S&apos;inscrire | Gestion de réclamation</title>
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
                Créer un nouveau compte
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Utilisez votre email pour créer un nouveau compte
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.first_name && formik.errors.first_name)}
              fullWidth
              helperText={formik.touched.first_name && formik.errors.first_name}
              label="Prénom"
              margin="normal"
              name="first_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.first_name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.last_name && formik.errors.last_name)}
              fullWidth
              helperText={formik.touched.last_name && formik.errors.last_name}
              label="Nom"
              margin="normal"
              name="last_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.last_name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Adresse Email"
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
              label="Mot de passe"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.confirm_password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.confirm_password}
              label="Confirmer votre Mot de passe"
              margin="normal"
              name="confirm_password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirm_password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                S&apos;inscrire maintenant
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Vous avez déjà un compte?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  S&apos;identifier
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
