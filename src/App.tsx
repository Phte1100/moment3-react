import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/CmsPage";
import HomePage from "./pages/HomePage";
import MenuList from "./components/MenuList";
import DetailPage from "./pages/DetailPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/menu/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
