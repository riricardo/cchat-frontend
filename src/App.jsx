import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";

function AnimatedApp() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <PageWrapper>
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            </PageWrapper>
          }
        />
        <Route
          path="/"
          element={
            <PageWrapper>
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            </PageWrapper>
          }
        />

        <Route
          path="/chat/:chatId"
          element={
            <PageWrapper>
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedApp />
    </BrowserRouter>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}

export default App;
