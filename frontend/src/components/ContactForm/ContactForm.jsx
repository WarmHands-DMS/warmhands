import { useState } from 'react';  
import './ContactForm.scss';

export default function Contact() {
  const [result, setResult] = useState("");  

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
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

  return (
    <div className='contactForm'>
      <form onSubmit={onSubmit}>
        Name: <input type="text" name="name" required /><br/>
        Email: <input type="email" name="email" required /><br/>
        Message: <textarea name="message" required></textarea><br/>

        <button type="submit">Send Message</button>
      </form>
      <span>{result}</span>
    </div>
  );
}
