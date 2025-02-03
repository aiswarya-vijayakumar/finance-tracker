import { Header } from "./shared/components/Header";
import ExpenseChart from "./shared/components/PieChart";
import TableView from "./shared/components/TableView";

export function Dashboard() {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <ExpenseChart />
        <TableView />
      </div>
    </>
  );
}
