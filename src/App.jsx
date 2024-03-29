import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Inbox = lazy(() => import('./pages/Inbox'));
const Trash = lazy(() => import('./pages/Trash'));
const Sent = lazy(() => import('./pages/Sent'));
const Compose = lazy(() => import('./pages/Compose'));
const InboxView = lazy(() => import('./pages/ViewInbox'));
const SentBoxView = lazy(() => import('./pages/SentBoxView'));
const ProtectedRoutes = lazy(() => import('./pages/ProtectedRoutes'));
function App() {
 
  return (
    <>
      <Suspense fallback={<div className="loader"></div>}>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="inbox" element={<Inbox />} />
            <Route path="trash" element={<Trash />} />
            <Route index element={<Compose />} />
            <Route path="sent" element={<Sent />} />
            <Route exact path="inbox/:id" element={<InboxView />} />
            <Route exact path="sentbox/:id" element={<SentBoxView />} />
          </Route>
          <Route path="/singup" element={<Signup />} />
          <Route path="/singin" element={<Signin />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
