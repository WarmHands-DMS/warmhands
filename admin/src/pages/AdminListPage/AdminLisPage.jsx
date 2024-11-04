import { AdminDataTable } from '../../components/DataTable/AdminDataTable';
import { useEffect, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const AdminListPage = () => {

const navigate = useNavigate();
const location = useLocation();
const toastContainerId = 'sendEmail-toast';

useEffect(() => {
  if (location.state?.toastMessage) {
    toast.success(location.state.toastMessage, {
      containerId: toastContainerId,
    });
    navigate(location.pathname, { replace: true, state: {} });
  }
}, [location, navigate]);

  return (
    <div className="userListPage">
      <AdminDataTable />
      <ToastContainer containerId={toastContainerId} />
    </div>
  );
};
