import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => {
  const profilesURL = "http://reclamation.bmi.mr/backend/profile-list/";
  let tokenStr = localStorage.getItem("token");
  const [profiles, setProfiles] = useState([]);
  const [rows_count, setRowsCount] = useState(null);
  const [profiles_page, setProfilesPage] = useState(1);
  const size = 6;

  useEffect(() => {
    axios
      .get(profilesURL + "?size=" + `${size}` + "&page=" + `${profiles_page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${tokenStr}`,
        },
      })
      .then((res) => {
        setRowsCount(res.data.count);
        setProfiles(res.data.results);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, [profiles_page]);

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setProfilesPage(value);
  };
  return (
    <>
      <Head>
        <title>Profils | Gestion de réclamations</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Profils
          </Typography>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {profiles.map((profile) => (
                <Grid item key={profile.id} lg={4} md={6} xs={12}>
                  <ProductCard profile={profile} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              page={profiles_page}
              count={Math.ceil(rows_count / size)}
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
