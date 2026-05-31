import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Initiatives from "./pages/Initiatives.jsx";
import Leadership from "./pages/Leadership.jsx";
import Join from "./pages/Join.jsx";
import Support from "./pages/Support.jsx";
import Donate from "./pages/Donate.jsx";
import News from "./pages/News.jsx";
import Contact from "./pages/Contact.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

function PublicSite() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/join" element={<Join />} />
          <Route path="/support" element={<Support />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
