import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, deleteExpense } from "../../redux/expenseSlice.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

export default function TableView() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.expenses);
  const [newRow, setNewRow] = useState({
    category: "",
    planned: "",
    actual: "",
  });

  const handleDelete = (id: string | number) => {
    dispatch(deleteExpense(id));
  };

  const handleAdd = () => {
    if (newRow.category && newRow.planned && newRow.actual) {
      dispatch(
        addExpense({
          id: Date.now(),
          category: newRow.category,
          planned: Number(newRow.planned),
          actual: Number(newRow.actual),
        })
      );
      setNewRow({ category: "", planned: "", actual: "" });
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 700, boxShadow: 3, borderRadius: 2, p: 2 }}
    >
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <TextField
          label="Category"
          size="small"
          value={newRow.category}
          onChange={(e) => setNewRow({ ...newRow, category: e.target.value })}
        />
        <TextField
          label="Planned ($)"
          size="small"
          type="number"
          value={newRow.planned}
          onChange={(e) => setNewRow({ ...newRow, planned: e.target.value })}
        />
        <TextField
          label="Actual ($)"
          size="small"
          type="number"
          value={newRow.actual}
          onChange={(e) => setNewRow({ ...newRow, actual: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          startIcon={<Add />}
        >
          Add
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2196F3" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Category
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              Planned ($)
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              Actual ($)
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">
                ${row.planned.toLocaleString()}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  color: row.actual > row.planned ? "red" : "green",
                }}
              >
                ${row.actual.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
