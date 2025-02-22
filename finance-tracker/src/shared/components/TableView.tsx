import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, deleteExpense, editExpense } from "../../redux/expenseSlice.tsx";
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
import { Delete, Add, Edit, Save, Cancel } from "@mui/icons-material";

export default function TableView() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.expenses);

  // State for adding a new expense row.
  const [newRow, setNewRow] = useState({
    category: "",
    planned: "",
    actual: "",
  });

  // State to track which row is currently being edited.
  const [editRowId, setEditRowId] = useState<string | number | null>(null);
  // State to hold the temporary values of the row being edited.
  const [editRow, setEditRow] = useState({
    category: "",
    planned: "",
    actual: "",
  });

  // Delete an expense by dispatching deleteExpense.
  const handleDelete = (id: string | number) => {
    dispatch(deleteExpense(id));
  };

  // Add a new expense if all fields are provided.
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

  // Begin editing a row by setting its id and pre-populating the edit state.
  const handleEdit = (row: any) => {
    setEditRowId(row.id);
    setEditRow({
      category: row.category,
      planned: row.planned.toString(),
      actual: row.actual.toString(),
    });
  };

  // Save the edited row by dispatching the editExpense action.
  const handleSaveEdit = () => {
    if (editRow.category && editRow.planned && editRow.actual) {
      dispatch(
        editExpense({
          id: editRowId,
          category: editRow.category,
          planned: Number(editRow.planned),
          actual: Number(editRow.actual),
        })
      );
      setEditRowId(null);
      setEditRow({ category: "", planned: "", actual: "" });
    }
  };

  // Cancel editing by clearing the edit state.
  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditRow({ category: "", planned: "", actual: "" });
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
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
              Planned ($)
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
              Actual ($)
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.id}>
              {/* Category cell */}
              <TableCell>
                {editRowId === row.id ? (
                  <TextField
                    size="small"
                    value={editRow.category}
                    onChange={(e) =>
                      setEditRow({ ...editRow, category: e.target.value })
                    }
                  />
                ) : (
                  row.category
                )}
              </TableCell>

              {/* Planned cell */}
              <TableCell align="right">
                {editRowId === row.id ? (
                  <TextField
                    size="small"
                    type="number"
                    value={editRow.planned}
                    onChange={(e) =>
                      setEditRow({ ...editRow, planned: e.target.value })
                    }
                  />
                ) : (
                  `$${row.planned.toLocaleString()}`
                )}
              </TableCell>

              {/* Actual cell */}
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  color: row.actual > row.planned ? "red" : "green",
                }}
              >
                {editRowId === row.id ? (
                  <TextField
                    size="small"
                    type="number"
                    value={editRow.actual}
                    onChange={(e) =>
                      setEditRow({ ...editRow, actual: e.target.value })
                    }
                  />
                ) : (
                  `$${row.actual.toLocaleString()}`
                )}
              </TableCell>

              {/* Actions cell */}
              <TableCell align="center">
                {editRowId === row.id ? (
                  <>
                    <IconButton color="primary" onClick={handleSaveEdit}>
                      <Save />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleCancelEdit}>
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
