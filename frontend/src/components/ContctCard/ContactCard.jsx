export const ContactCard = ({ title, number }) => {
    return (
      <div className="contact-card">
        <h3>{title}</h3>
        <p>{number}</p>
      </div>
    );
  };

