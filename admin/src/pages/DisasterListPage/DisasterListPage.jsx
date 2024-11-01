import { useLocation, useNavigate } from "react-router-dom";
import { DisasterDataTable } from "../../components/DataTable/DisasterDataTable";

import './DisasterListPage.scss';
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export const DisasterListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toastContainerId = 'disasterList-toast';

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
        containerId: toastContainerId,
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  
  return (
    <div className="disasterListPage">
      <DisasterDataTable />
      <ToastContainer containerId={toastContainerId} />
    </div>
  );
};
