import { createContext, useEffect, useState } from 'react';

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => {
          setLoaded(true);
          // Ensure the cloudinary object is available
          if (window.cloudinary) {
            initializeCloudinaryWidget();
          }
        });
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
        if (window.cloudinary) {
          initializeCloudinaryWidget();
        }
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (window.cloudinary && !widget) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          ...uwConfig,
          sources: ['local', 'camera', 'url'], 
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );
      setWidget(myWidget);
    }
  };

  const openWidget = () => {
    if (widget) {
      widget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type='button'
        id="upload_widget"
        className="cloudinary-button"
        onClick={openWidget}
        disabled={!loaded || !widget} // Disable until fully loaded
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
