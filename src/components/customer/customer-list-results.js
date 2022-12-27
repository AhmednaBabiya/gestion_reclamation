import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Highlighter from "react-highlight-words";
import Router from "next/router";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import axios from "axios";
import { Search as SearchIcon } from "../../icons/search";
import { SeverityPill } from "../severity-pill";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownload from "js-file-download";

export const CustomerListResults = () => {
  const baseURL = `https://reclamation.bmi.mr:8000/backend/reclamation-list/?search=`;
  const downloadURL = "http://127.0.0.1:8000/backend/export-to-csv";
  const [rows_count, setRowsCount] = useState(null);
  const [reclamations_page, setReclamationsPage] = useState(1);
  const [rec_customers, setRecCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const size = 5;
  let tokenStr = localStorage.getItem("token");

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setReclamationsPage(value);
  };

  const storedData = (
    id,
    created_at,
    customer_name,
    customer_phone_number,
    customer_nni_number,
    type,
    status
  ) => {
    return {
      id,
      created_at,
      customer_name,
      customer_phone_number,
      customer_nni_number,
      type,
      status,
    };
  };

  const handleDownload = () => {
    axios
      .get(downloadURL, {
        headers: {
          "Content-Type": "text/html",
        },
      })
      .then((res) => {
        let date = new Date().toLocaleString() + "";
        console.log("date : ", date);
        FileDownload(res.data, `reclamation_export ${date}.csv`);
      })
      .catch((err) => {
        console.log("error message", err);
      });
  };

  useEffect(() => {
    axios
      .get(baseURL + search + "&size=" + `${size}` + "&page=" + `${reclamations_page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${tokenStr}`,
        },
      })
      .then((response) => {
        setRowsCount(response.data.count);
        setRecCustomers(
          response.data.results.map((r) =>
            storedData(
              r.id,
              r.created_at.split("T")[0] +
                " " +
                r.created_at.split("T")[1].split(".")[0].slice(0, -3),
              r.customer_name,
              r.customer_phone_number,
              r.customer_nni_number,
              r.type,
              r.status
            )
          )
        );
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }, [search, reclamations_page]);

  const handleDetails = (id) => {
    Router.push(`/reclamation-details/${id}`);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Réclamations
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }} style={{ display: "flex" }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Rechercher par nom, nni, tél ou date"
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <DownloadIcon
                  style={{ marginTop: 10, marginLeft: 12 }}
                  fontSize="large"
                  onClick={handleDownload}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom du client</TableCell>
                  <TableCell>Créé le</TableCell>
                  <TableCell>Téléphone du client</TableCell>
                  <TableCell>NNI client</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rec_customers.map((customer) => (
                  <TableRow hover key={customer.id} onClick={() => handleDetails(customer.id)}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[search]}
                            autoEscape={true}
                            textToHighlight={customer.customer_name}
                          />
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={customer.created_at}
                      />
                    </TableCell>
                    <TableCell>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={customer.customer_phone_number.toString()}
                      />
                    </TableCell>
                    <TableCell>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={customer.customer_nni_number.toString()}
                      />
                    </TableCell>
                    <TableCell>{customer.type}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (customer.status === "Traitée" && "success") ||
                          (customer.status === "Pas encore traitée" && "error") ||
                          "warning"
                        }
                      >
                        {customer.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
      <Pagination
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        page={reclamations_page}
        count={Math.ceil(rows_count / size)}
        onChange={handlePageChange}
      />
    </>
  );
};
