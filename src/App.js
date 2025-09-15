import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FurnitureInRoomViewer from './FurnitureInRoomViewer';
import FurnitureCatalog from './FurnitureCatalog';
import CartPage from './CartPage';
import LoginSignup from './LoginSignup';
import './App.css';

// ✅ Welcome Screen Component
function WelcomeScreen({ onFinish }) {
  const [showImage, setShowImage] = useState(false);
  const [imageAnimated, setImageAnimated] = useState(false);
  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    const textFadeDelay = 3000; // Time to trigger text fade out
    const imageDelay = 4000; // Time to show image
    const screenExitDelay = 7500; // Total time before transitioning to next screen

    const textFadeTimer = setTimeout(() => setHideText(true), textFadeDelay);
    const textTimer = setTimeout(() => {
      setShowImage(true);
      setTimeout(() => setImageAnimated(true), 100);
    }, imageDelay);
    const imageTimer = setTimeout(() => onFinish(), screenExitDelay);

    return () => {
      clearTimeout(textFadeTimer);
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, [onFinish]);

  const welcomeMessage = 'WELCOME TO';

  return (
    <div className="welcome-screen">
      <div className={`welcome-text ${hideText ? 'fade-out' : ''}`}>
        {welcomeMessage.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {showImage && (
        <img
          src={process.env.PUBLIC_URL + '/nazara.png'}
          alt="Welcome Logo"
          className={`welcome-image ${imageAnimated ? 'animate-in' : ''}`}
        />
      )}
    </div>
  );
}

// ✅ View Cart Button
function ViewCartButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/cart')} className="view-cart-button">
      🛒 View Cart
    </button>
  );
}

// ✅ Main Layout after login and welcome
function AppLayout({ selectedFurniture, setSelectedFurniture }) {
  return (
    <>
      <img
        src="/logo.jpg"
        alt="Furnituristic Logo"
        className="logo-top-left"
      />

      <ViewCartButton />

      <main className="App-main">
        <Routes>
          <Route
            path="/"
            element={<FurnitureCatalog onSelect={setSelectedFurniture} />}
          />
          <Route
            path="/viewer"
            element={<FurnitureInRoomViewer selectedFurniture={selectedFurniture} />}
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 SmartDecor Inc. | Built with 💙 and React + Three.js</p>
      </footer>
    </>
  );
}

// ✅ Root App Component
function App() {
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className={`App ${!showWelcome ? 'after-welcome' : ''}`}>
        {showWelcome ? (
          <WelcomeScreen onFinish={() => setShowWelcome(false)} />
        ) : !isAuthenticated ? (
          <LoginSignup onAuth={() => setIsAuthenticated(true)} />
        ) : (
          <AppLayout
            selectedFurniture={selectedFurniture}
            setSelectedFurniture={setSelectedFurniture}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
