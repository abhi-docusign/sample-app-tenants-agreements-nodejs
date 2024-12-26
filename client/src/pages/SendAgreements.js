import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, sendRequest } from '../api/apiHelper';
import Form from '../components/Form';
import BehindTheScenes from '../components/BehindTheScenes';

export const blobToData = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      resolve(base64)
    }
    reader.readAsDataURL(blob)
  })
}

function SendAgreements({ text, formText, btsText }) {
  let navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const avatarUrl = '/assets/img/default_avatar.png';

  // Sends POST request to server requesting redirect URL for embedded sending
  // based on the info the user put in the form.
  async function handleSubmit(event) {
    setRequesting(true);
    
    // Make request body
    const body = {
      signerName: event.firstName + ' ' + event.lastName,
      signerEmail: event.signerEmail,
      docs: await blobToData(event.docs[0])
    };

    // Send request to server
    try {
      const response = await sendRequest('/sendAgreements', body);

      // Received URL for embedded sending, redirect user
      if (response.status === 200) {
        window.location = response.data;
      }
    } catch (error) {
      console.log(error);
      const errorPageText = handleError(error);
      navigate('/error', { state: errorPageText });
    }
  }

  return (
    <section className="content-section">
      <div className="container">
        <div className="header-container">
          <h1>{text.title}</h1>
        </div>
        <Form
          avatarUrl={avatarUrl}
          userRoleName={text.names.userRoleName}
          text={formText}
          onSubmit={handleSubmit}
          submitted={requesting}
        />
        {/* <BehindTheScenes
          title={btsText.title}
          description={btsText.sendAgreements.description}
        /> */}
      </div>
    </section>
  );
}

export default SendAgreements;
