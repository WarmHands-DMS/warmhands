import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminAuthContext } from '../../context/AuthContext';


export const SendEmailPage = () => {
  const incident = useLoaderData(); // Access data from loader
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentAdmin } = useContext(AdminAuthContext);
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

  useEffect(() => {
    setSubject(`Disaster Alert: ${incident.title} in ${incident.city}`);

    // Sanitize and parse the description
    const sanitizedHtml = DOMPurify.sanitize(incident.description);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedHtml, 'text/html');
    const plainTextDescription = doc.body.textContent || '';

    // Format message without extra indentation
    const additionalInfo = `Disaster Summary:
  - Location: ${incident.city}
  - Deaths: ${incident.incidentDetail.deaths || '0'}
  - Casualties: ${incident.incidentDetail.casualities || '0'}

Disaster Details:
  ${plainTextDescription}

View the full disaster report here: http://localhost:5173/${
      incident.id
    }`;

    setMessage(additionalInfo);
  }, [incident]);

  const handleUpdateSentEmail = async () => {
    try {
      await axios.put(
        `http://localhost:8800/api/incidents/${incident.id}/email-sent`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    setIsLoading(true);
    if (incident.userCount === 0) {
      toast.error('There are no users in this district.', { containerId: toastContainerId });
    } else {
      try {
        await axios.post(
          `http://localhost:8800/api/users/${currentAdmin.id}/send-emails/${incident.city}`,

          {
            subject,
            message,
          },
          { withCredentials: true }
        );

        await axios.post(
          `http://localhost:8800/api/emails/add`,

          {
            title: subject,
            userCount: incident.userCount,
            city: incident.city,
            message,
            incidentId: incident.id,
          },
          { withCredentials: true }
        );

        toast.success('Emails sent successfully', {
          containerId: toastContainerId,
        });

        handleUpdateSentEmail();
        navigate(`/disasters`, {
          state: { toastMessage: 'Emails sent successfully!', refresh: true },
        });
      } catch (error) {
        toast.error('Failed to send emails', { containerId: toastContainerId });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
  }};

  const goBack = () => {
    navigate(`/${incident.id}`);
  };

  return (
    <div className="sendEmailPage">
      <span className="title">Compose Email</span>
      <div className="email">
        <div className="information">
          <p>
            <span>District: </span>
            {incident.district}
          </p>
          <p>
            <span>User Count: </span>
            {incident.userCount}
          </p>
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="15"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="email-btns">
          <span onClick={goBack}>Cancel</span>
          <button onClick={!isLoading ? handleSend : null} disabled={isLoading} className={isLoading ? "disabled" : ""}>
            {incident.sentEmail ? 'Send Again' : 'Send'}
          </button>
        </div>
      </div>
      {incident.sentEmail && (
        <div className="email-sent-message">
          Emails for this incident have already been sent.
        </div>
      )}
      <ToastContainer containerId={toastContainerId} />
    </div>
  );
};
