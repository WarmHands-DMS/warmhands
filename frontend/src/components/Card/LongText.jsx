import { useEffect, useState } from 'react';
import domPurify from 'dompurify';

const LongText = ({ description }) => {
  const [truncatedText, setTruncatedText] = useState('');

  useEffect(() => {
    if (description) {
      // Sanitize the HTML
      const sanitizedHtml = domPurify.sanitize(description);
      // Create a temporary element to extract text content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sanitizedHtml;
      const text = tempDiv.textContent || tempDiv.innerText || '';
      // Truncate the text
      const words = text.split(' ');
      const truncated = words.slice(0, 16).join(' ') + '...';
      setTruncatedText(truncated);
    }
  }, [description]);

  return (
    <div
      className="long-text"
      dangerouslySetInnerHTML={{ __html: domPurify.sanitize(description) }}
    />
  );
};

export default LongText;
