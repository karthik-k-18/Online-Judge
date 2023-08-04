import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import FlakyOutlinedIcon from "@mui/icons-material/FlakyOutlined";
import Tooltip from "@mui/material/Tooltip";
import "./Table.css";

export default function BasicTable({ problems }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "70%",
        margin: "0 auto",
        padding: "60px",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey" }}>
              <TableCell align="center">
                <Typography variant="h6" sx={{ color: "white" }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ color: "white" }}>
                  ID
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ color: "white" }}>
                  Title
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ color: "white" }}>
                  Difficulty
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow
                key={problem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Status status={problem.status} />
                <TableCell align="center">{problem.id}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => navigate(`/problems/${problem.id}`)}
                >
                  <Typography className="problem-cell">
                    {problem.name}
                  </Typography>
                </TableCell>
                <Difficulty dif={problem.tags.difficulty} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const Difficulty = ({ dif }) => {
  return (
    <>
      {dif === "easy" ? (
        <TableCell align="center" sx={{ color: "green" }}>
          Easy
        </TableCell>
      ) : dif === "medium" ? (
        <TableCell align="center" sx={{ color: "orange" }}>
          Medium
        </TableCell>
      ) : (
        <TableCell align="center" sx={{ color: "red" }}>
          Hard
        </TableCell>
      )}
    </>
  );
};

const Status = ({ status }) => {
  return (
    <>
      {status !== "done" ? (
        <TableCell align="center" sx={{ color: "grey" }}>
          <Tooltip title="Not Solved" arrow>
            <FlakyOutlinedIcon />
          </Tooltip>
        </TableCell>
      ) : (
        <TableCell align="center" sx={{ color: "green" }}>
          <Tooltip title="Accepted" arrow>
            <CheckCircleOutlinedIcon />
          </Tooltip>
        </TableCell>
      )}
    </>
  );
};
