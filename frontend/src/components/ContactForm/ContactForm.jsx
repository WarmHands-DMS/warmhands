import { useState } from 'react';  
import './ContactForm.scss';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';


export default function Contact() {
  const [result, setResult] = useState(null);  

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "82db7e58-4468-4277-9723-e35311bf0bf2");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  console.log(result)

  return (
    <div className="contactForm">
      <form onSubmit={onSubmit}>
        <h2>Contact Us</h2>
        Name
        <div className="input">
          <PersonIcon className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
        </div>
        Email
        <div className="input">
          <MailIcon className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            required
          />
        </div>
        Message
        <div className="input">
          <textarea name="message" required />
        </div>
        <br />
        <button type="submit">Send Message</button>
      </form>
      <span
        className={`submit-msg ${
          result === 'Sending...'
            ? 'sending'
            : result === 'Form Submitted Successfully'
            ? 'sent'
            : ''
        }`}
      >
        {result}
      </span>
    </div>
  );
}
