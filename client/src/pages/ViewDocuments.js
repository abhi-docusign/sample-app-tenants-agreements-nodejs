import React, { useState, useEffect } from 'react';
import { handleError, sendRequest } from '../api/apiHelper';
import BehindTheScenes from '../components/BehindTheScenes';
import { useNavigate } from 'react-router-dom';

function ViewDocuments({ text, btsText }) {

  let navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await sendRequest('/viewDocuments');
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
        const errorPageText = handleError(error);
        navigate('/error', { state: errorPageText });
      }
    };

    fetchDocuments();
  }, []);

  return (
    <section className="content-section">
      <div className="container">
        <div className="header-container">
          <h1>{text.title}</h1>
        </div>
        <div className="form-holder">
        <table className="documents-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Envelope ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="document-row">
                  <td className="document-cell">{document.emailSubject}</td>
                  <td className="document-cell">{document.envelopeId}</td>
                  <td className="document-cell">{document.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <BehindTheScenes
          title={btsText.title}
          description={btsText.viewDocuments.description}
        /> */}
      </div>
    </section>
  );
}

export default ViewDocuments;
