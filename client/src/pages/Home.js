import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../api/apiHelper';
import Card from '../components/Card';

function Home({ text }) {
  let navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  });

  // If the previous screen was the login screen, then
  // make sure the server has the necessary user information
  // stored for making Docusign API calls.
  async function getUserInfo() {
    try {
      let response = await axios.get('/auth/login');

      // If the user revoked consent after logging in, check to make
      // sure they still have consent
      if (response.status === 210) {
        console.log('Consent URL: ' + response.data);
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
      <div className="home-container">
        <div className="home-header-container">
          <h1>{text.title}</h1>
        </div>
        <div className="card-holder">
          <Card
            cardType="send-agreements-card"
            iconUrl="/assets/img/agreements.png"
            linkTo="/send-tenant-agreement"
            title={text.sendAgreements}
            featureList={text.sendAgreementsFeatures}
            buttonType="send-agreements-btn"
          />
          <Card
            cardType="view-documents-card"
            iconUrl="/assets/img/documents.png"
            linkTo="/view-agreements"
            title={text.viewDocuments}
            featureList={text.viewDocumentsFeatures}
            buttonType="view-documents-btn"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
