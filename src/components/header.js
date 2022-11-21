import { Button } from "@mui/material";
import React, { useState } from "react";

const Header = ({ language, setLanguage }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src="/static/LOGO-SEDAD.svg" style={{ maxWidth: "20%", height: "auto" }}></img>
      {/* <img src="/static/LOGO BMI.svg" style={{ maxWidth: "20%" }}></img> */}
      {language == "ar" ? (
        <Button size="large" onClick={() => setLanguage("fr")}>
          <a>Français</a>
          <img
            style={{ width: 15, marginTop: 2, marginLeft: 3 }}
            src="/static/Flag-France.png"
          ></img>
        </Button>
      ) : (
        <Button size="large" onClick={() => setLanguage("ar")}>
          <img
            style={{ width: 15, marginTop: 2, marginRight: 3 }}
            src="/static/flag-mauritania.png"
          ></img>
          <a>العربية</a>
        </Button>
      )}
    </div>
  );
};
export default Header;
