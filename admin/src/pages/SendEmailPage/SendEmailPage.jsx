import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './SendEmailPage.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SendEmailPage = () => {
  const incident = useLoaderData(); // Access data from loader
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  console.log(incident);

  useEffect(() => {
    setSubject(`Incident Alert: ${incident.title} in ${incident.city}`);

    // Sanitize and parse the description
    const sanitizedHtml = DOMPurify.sanitize(incident.description);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedHtml, 'text/html');
    const plainTextDescription = doc.body.textContent || '';

    // Format message without extra indentation
    const additionalInfo = `Incident Summary:
  - Location: ${incident.city}
  - Deaths: ${incident.incidentDetail.deaths || '0'}
  - Casualties: ${incident.incidentDetail.casualities || '0'}

Incident Details:
  ${plainTextDescription}

View the full incident report here: http://http://localhost:5173/${
  incident.id
  }`;

      setMessage(additionalInfo);
     }, [incident]);

  const handleSend = async () => {
    try {
      await axios.post(
        `http://localhost:8800/api/users/send-emails/${incident.city}`,
        {
          subject,
          message,
        }
      );
      toast.success('Emails sent successfully');
    } catch (error) {
      toast.error('Failed to send emails');
      console.error(error);
    }
  };

  const goBack = () => {
    navigate(`/${incident.id}`);
  };

  return (
    <div className="sendEmailPage">
      <Sidebar />
      <div className="sendEmailPage-container">
        <Navbar />
        <div className="sendEmail">
          <div className="wrapper">
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
                  rows="22"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className='email-btns'>
                <span onClick={goBack}>Cancel</span>
                <span onClick={handleSend}>Send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
