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

// import { useEffect, useState } from 'react';
// import domPurify from 'dompurify';

// const LongText = ({ description }) => {
//   const [truncatedText, setTruncatedText] = useState('');

//   useEffect(() => {
//     if (description) {
//       // Sanitize the HTML
//       const sanitizedHtml = domPurify.sanitize(description);
//       // Create a temporary element to extract text content
//       const tempDiv = document.createElement('div');
//       tempDiv.innerHTML = sanitizedHtml;
//       const text = tempDiv.textContent || tempDiv.innerText || '';

//       // Adjust the maximum character limit for three lines
//       const maxCharacters = 60; // Change this value as needed

//       if (text.length > maxCharacters) {
//         // Truncate text while ensuring we do not exceed maxCharacters
//         const truncated = text.slice(0, maxCharacters).trim();
//         const lastSpaceIndex = truncated.lastIndexOf(' '); // Find the last space index

//         // If there's no space found, truncate at maxCharacters
//         const finalText =
//           lastSpaceIndex > 0
//             ? truncated.slice(0, lastSpaceIndex) + '...'
//             : truncated + '...'; // If no spaces, just truncate at maxCharacters

//         setTruncatedText(finalText);
//       } else {
//         setTruncatedText(text); // Set the full text if it's within the limit
//       }
//     }
//   }, [description]);

//   return <div className="long-text">{truncatedText}</div>;
// };

// export default LongText;
