import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import ChatPage from "./components/pages/ChatPage";
import AddUserPage from "./components/pages/AddUserPage";
import AddGroupPage from "./components/pages/AddGroupPage";

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

        <Route
          path="/add-user"
          element={
            <PageWrapper>
              <PrivateRoute>
                <AddUserPage />
              </PrivateRoute>
            </PageWrapper>
          }
        />

        <Route
          path="/add-group"
          element={
            <PageWrapper>
              <PrivateRoute>
                <AddGroupPage />
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

export default App;
