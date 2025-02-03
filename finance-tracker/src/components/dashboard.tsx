import { Header } from "./shared/components/header";
import ExpenseChart from "./shared/components/pieChart";
import TableView from "./shared/components/tableView";

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
