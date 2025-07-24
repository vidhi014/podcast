import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Signup from '../src/components/Signup.jsx';
import Signin from '../src/components/Signin.jsx';
import Navbar from '../src/components/Navbar.jsx';
import Menu from '../src/components/Menu.jsx';
import Dashboard from '../src/Pages/Dashboard.jsx'
import ToastMessage from './components/ToastMessage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { closeSignin } from "./redux/slices/setSigninSlice.jsx";
import BusinessPage from '../src/Pages/Podcast/BusinessPage.jsx';
import EducationPage from '../src/Pages/Podcast/EducationPage.jsx';
import ComedyPage from '../src/Pages/Podcast/ComedyPage.jsx';
import HealthPage from "../src/Pages/Podcast/HealthPage.jsx";
import MostPopularPage from "./Pages/Podcast/MostPopularPage.jsx";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const Podstream = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const {openplayer,type, episode, podid, currenttime,index} = useSelector((state) => state.audioplayer);
  const {opensi} =  useSelector((state) => state.signin);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);


  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch()
    
    useEffect(() => {
      const resize = () => {
        if (window.innerWidth < 1110) {
          setMenuOpen(false);
        } else {
          setMenuOpen(true);
        }
      }
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(()=>{
      dispatch(
        closeSignin()
      )
    },[])

  return (

    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <BrowserRouter>
        {opensi && <Signin setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
        {SignUpOpen && <Signup setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
        <Podstream>
          {menuOpen && <Menu setMenuOpen={setMenuOpen} darkMode={darkMode} setDarkMode={setDarkMode} setUploadOpen={setUploadOpen} setSignInOpen={setSignInOpen}/>}
          <Frame>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
            {SignInOpen && ( <Signin setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} /> )}
            {SignUpOpen && ( <Signup setSignUpOpen={setSignUpOpen} setSignInOpen={setSignInOpen} /> )}
            <Routes>
              <Route path='/' exact element={<Dashboard setSignInOpen={setSignInOpen}/>} />
              <Route path='/' exact element={<Dashboard setSignInOpen={setSignInOpen}/>} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/showpodcasts/business" element={<BusinessPage />} />
              <Route path="/showpodcasts/education" element={<EducationPage />} />
              <Route path="/showpodcasts/comedy" element={<ComedyPage />} />
              <Route path="/showpodcasts/health" element={<HealthPage />} />
              <Route path="/showpodcasts/mostPopular" element={<MostPopularPage />} />
            </Routes>
          </Frame>

          {open && <ToastMessage open={open} message={message} severity={severity} />}
        </Podstream>

      </BrowserRouter>

    </ThemeProvider>

  );
}

export default App;
