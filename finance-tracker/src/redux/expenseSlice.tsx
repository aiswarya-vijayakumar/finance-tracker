import { createSlice } from "@reduxjs/toolkit";
import { expenseData } from "../shared/constants/shared.constants";

const initialState = expenseData;

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },

    deleteExpense: (state, action) => {
      return state.filter((expense) => expense.id !== action.payload);
    },

    editExpense: (state, action) => {
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addExpense, deleteExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
