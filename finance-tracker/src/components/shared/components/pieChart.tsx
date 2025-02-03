import Box from "@mui/material/Box";

import { PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";

export default function ExpenseChart() {
  const data = useSelector((state: any) => state.expenses);
  const pieData = data.map((row: any) => ({
    id: row.id,
    value: row.actual,
    label: row.category,
  }));
  return (
    <Box sx={{ width: "100vw", maxWidth: "40%" }}>
      <PieChart
        height={300}
        series={[
          {
            data: pieData,
            color: "white",
            innerRadius: 30,
            arcLabel: (item) => `${item.label}`,
            highlightScope: { fade: "global", highlight: "item" },
            arcLabelMinAngle: 30,
          },
        ]}
        slotProps={{
          legend: {
            labelStyle: { fill: "white", fontWeight: "bold" },
          },
          pieArcLabel: {
            style: { fill: "white", fontWeight: "bold" },
          },
        }}
      />
    </Box>
  );
}
