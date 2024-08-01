import { useEffect, useState } from 'react';

const LongText = ({description}) => {
  const text = description;
  const [truncatedText, setTruncatedText] = useState('');

  useEffect(() => {
    if (text) {
      const words = text.split(' ');
      const truncated = words.slice(0, 30).join(' ') + '...';
      setTruncatedText(truncated);
    }
  }, [text]);

  return <div className="long-text">{truncatedText}</div>;
};

export default LongText;