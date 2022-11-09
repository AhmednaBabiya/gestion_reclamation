import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { SeverityPill } from "../severity-pill";

export const ProductCard = ({ profile, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <PersonIcon fontSize="large" />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h6">
        {profile.first_name} {profile.last_name}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        <SeverityPill
          color={
            (profile.is_admin === true && "success") || (profile.is_admin === false && "warning")
          }
        >
          {profile.is_admin == true ? "admin" : "consultant"}
        </SeverityPill>
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
