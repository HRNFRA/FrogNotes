import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useState } from 'react';
import { User } from './models/user';
import { Container } from 'react-bootstrap';
import styles from './styles/App.module.css'
import NotesPage from './pages/NotesPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';


function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLogInModal, setShowLogInModal] = useState(false)
  
  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLogInModal(true)}
          onSignupClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
            <Routes>

              <Route 
              path="/"
              element={<NotesPage loggedInUser={loggedInUser}/>}
              />
              
              <Route 
              path="/privacy"
              element={<PrivacyPage/>}
              />
              
              <Route 
              path="/*"
              element={<NotFoundPage/>}
              />

            </Routes>
        </Container>
        { showSignUpModal &&
            <SignUpModal 
              onDismiss={() => setShowSignUpModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user)
                setShowSignUpModal(false)
              }}
            />
          }
          { showLogInModal &&
            <LoginModal 
              onDismiss={() => setShowLogInModal(false)}
              onLoginSuccessful={(user) => {
                setLoggedInUser(user)
                setShowSignUpModal(false)
              }}
            />
          }
      </div>
    </BrowserRouter>
  )
}

export default App;
