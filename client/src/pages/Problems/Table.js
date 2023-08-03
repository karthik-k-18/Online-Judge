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
import "./Table.css"


export default function BasicTable({ problems}) {
    const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow
                key={problem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Done
                </TableCell>
                <TableCell align="center">{problem.id}</TableCell>
                <TableCell 
                align="center" 
                onClick={() => navigate(`/problems/${problem.id}`)}
                
                ><Typography className="problem-cell">
                    {problem.name} 
                </Typography></TableCell>
                <TableCell align="center">{problem.tags.difficulty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
