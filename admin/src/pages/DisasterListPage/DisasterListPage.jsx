import { DisasterDataTable } from "../../components/DataTable/DisasterDataTable";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import './DisasterListPage.scss';

export const DisasterListPage = () => {
  return (
    <div className="list-page">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <div className="list">
          <div className="wrapper">
            <DisasterDataTable />
          </div>
        </div>
      </div>
    </div>
  );
};
