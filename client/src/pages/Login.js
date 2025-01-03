import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../api/apiHelper';
import Popup from '../components/Popup';
import Footer from '../components/Footer';

function Login({ text, githubText, btsText, footerText }) {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const heroUrl = '/assets/img/hero.png';
  let navigate = useNavigate();

  // Logs the user in, and redirects the user to a consent window if
  // they haven't provided consent yet.
  async function handleLogin() {
    try {
      setSubmitted(true);

      let response = await axios.get('/auth/login');

      // If user has never logged in before, redirect to consent screen
      if (response.status === 210) {
        console.log('Consent URL: ' + response.data);
        window.location = response.data;
      } else if (response.status === 200) {
        // User is logged in, redirect to home page
        navigate('/index');
      }
    } catch (error) {
      console.log(error);
      const errorPageText = handleError(error);
      navigate('/error', { state: errorPageText });
    }
  }

  return (
    <section className="content-section">
      <div className="login-container">
        <div className="login-header-container">
          <h1>{text.title}</h1>
        </div>
        <div className="login-desc">
          {text.description}

          <div className="login-btn-container">
            <div className="more-info-btn-container">
              <button
                className="login-button"
                onClick={handleLogin}
                disabled={submitted}
              >
                {text.loginButton}
              </button>
              <button
                className="more-info-btn"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                {text.moreInfoButton}
              </button>
            </div>
            <a
              href={githubText.githubLink}
              className="github-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {githubText.githubButton}
            </a>
          </div>
        </div>
        <img className="hero" src={heroUrl} alt="hero" />

        {isOpen && (
          <Popup
            text={btsText}
            handleClose={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </div>
      
      <Footer text={footerText} />
    </section>
  );
}

export default Login;
