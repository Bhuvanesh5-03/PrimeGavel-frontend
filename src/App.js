import 'bootstrap-icons/font/bootstrap-icons.css';
import AuctionDetail from './AuctionDetail';
import AuctioneerLogin from './login/AuctioneerLogin';
import Auction from './Auction';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Selection from './Selection';
import TraderLogin from './login/TraderLogin';
import Home from './Home';
import Footer from './Footer';
import TraderSignUp from './login/TraderSignup';
import Forgotpass from './login/Forgotpass';
import MyWinnings from './TraderPage/MyWinnings';
import './css/App.css';
import TraderPage from './TraderPage/TraderPage';
import TodayAuction from './TraderPage/TodayAuction';
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/Selection" element={<Selection />} />
            <Route path="/AuctioneerLogin" element={<AuctioneerLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/TraderPage" element={<TraderPage />} />
            <Route path="/MyWinnings" element={<MyWinnings />} />
            <Route path="/AuctionDetail" element={<AuctionDetail />} />
            <Route path="/AuctionPage" element={<Auction />} />
            <Route path="/TodayAuction" element={<TodayAuction />} />
            <Route path="/TraderLogin" element={<TraderLogin />} />
            <Route path="/ForgotPassword" element={<Forgotpass />} />
            <Route path="/TraderSignUp" element={<TraderSignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
