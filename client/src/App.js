import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Success from './pages/Success';
import PageNotFound from './pages/PageNotFound';
import axios from 'axios';
import RequireAuth from './components/RequireAuth';
import './assets/scss/main.scss';
import Header from './components/Header';
import { handleError } from './api/apiHelper';
import SendAgreements from './pages/SendAgreements';
import ViewDocuments from './pages/ViewDocuments';

function App() {
  let mountedRef = useRef(true);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    // Load in the text content on page load.
    getTextContent();

    // Clean up
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // GETs the static text content from the server that will be used to
  // populate the app.
  async function getTextContent() {
    try {
      let response = await axios.get('/assets/text.json');

      // Only set states if the component is mounted, otherwise return null.
      if (!mountedRef.current) return null;

      setTextContent(response.data);
    } catch (error) {
      console.log('Error getting static text asset.');
      console.log(error);
      const errorPageText = handleError(error);
      <Navigate to="/error" state={errorPageText} />;
    }
  }

  return (
    <>
      {textContent ? (
        <Router>
          <Header text={textContent.header} />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  text={textContent.login}
                  githubText={textContent.header}
                  btsText={textContent.behindTheScenes.login}
                  footerText={textContent.footer}
                />
              }
            />

            <Route element={<RequireAuth />}>
              <Route
                path="/index"
                element={
                  <Home
                    text={textContent.home}
                  />
                }
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route
                path="send-tenant-agreement"
                element={
                  <SendAgreements
                    text={textContent.sendAgreements}
                    formText={textContent.formLabels}
                    btsText={textContent.behindTheScenes}
                  />
                }
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route
                path="view-agreements"
                element={
                  <ViewDocuments
                    text={textContent.viewDocuments}
                    formText={textContent.formLabels}
                    btsText={textContent.behindTheScenes}
                  />
                }
              />
            </Route>

            <Route
              path="success"
              element={<Success text={textContent.success} />}
            />
            <Route path="error" element={<ErrorPage />} />
            <Route
              path="*"
              element={<PageNotFound text={textContent.pageNotFound} />}
            />
          </Routes>
          <footer className="copyright">{textContent.footer.copyright}</footer>
        </Router>
      ) : (
        // Display nothing while static assets are being loaded in.
        <></>
      )}
    </>
  );
}

export default App;
