import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const profileURL = "http://reclamation.bmi.mr:8000/backend/profile/me/";
  let tokenStr = localStorage.getItem("token");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [is_admin, setIsAdmin] = useState(false);

  const handleSignOut = () => {
    localStorage.clear("token");
    Router.push("/login");
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
        setIsAdmin(res.data.is_admin);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{is_admin === true ? "Admin" : "Consultant"}</Typography>
        <Typography color="text.secondary" variant="body2">
          {last_name + " "}
          {first_name}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Se déconnecter</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
