import { useLocation, useNavigate } from 'react-router-dom';
import { DisasterDataTable } from '../../components/DataTable/DisasterDataTable';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import './DisasterListPage.scss';

export const DisasterListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toastContainerId = 'disasterList-toast';
  const [renderTrigger, setRenderTrigger] = useState(false);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
        containerId: toastContainerId,
      });
      navigate(location.pathname, { replace: true, state: {} });
    }

    // Function to handle popstate event (triggered by Back/Forward navigation)
    const handlePopState = () => {
      setRenderTrigger((prev) => !prev);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, navigate]);

  return (
    <div className="disasterListPage">
      <DisasterDataTable />
      <ToastContainer containerId={toastContainerId} />
    </div>
  );
};
