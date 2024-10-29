import { useLocation } from "react-router-dom";
import { DisasterDataTable } from "../../components/DataTable/DisasterDataTable";

import './DisasterListPage.scss';
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export const DisasterListPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
    }
  }, [location.state]);
  
  return (
    <div className="disasterListPage">
      <DisasterDataTable />
      <ToastContainer />
    </div>
  );
};
