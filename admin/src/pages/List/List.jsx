import { DataTable } from "../../components/DataTable/DataTable";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./List.scss"

export const List = () => {
  return (
    <div className="list-page">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <div className="list">
          <div className="wrapper">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
