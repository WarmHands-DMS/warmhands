import { UserDataTable } from '../../components/DataTable/UserDataTable';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import './UserListPage.scss';

export const UserListPage = () => {
  return (
    <div className="list-page">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <div className="list">
          <div className="wrapper">
            <UserDataTable />
          </div>
        </div>
      </div>
    </div>
  );
};
