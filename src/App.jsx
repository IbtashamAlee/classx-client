import * as React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getRoles} from "./redux/actions/user-actions";
import {signinUser} from "./redux/actions/auth-actions";
import {About} from "./pages/about";
import {Signup} from "./pages/signup";
import {ThemeProvider, createTheme} from "@mui/material";
import {Signin} from "./pages/signin";
import {NotFound} from "./pages/not-found";
import {AccountVerify} from "./pages/account-verify";
import {ForgotPassword} from "./pages/forgot-password";
import CreateInstitute from "./pages/create-institute";
import {Dashboard} from "./pages/dashboard";
import {ClassDetails} from "./pages/class-details"
import {Feed} from "./pages/feed";
import {Assessments} from "./pages/assessments";
import Attendance from "./pages/attendance";


export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({
    //     type: "SET_USER_ACTION",
    //     hi: "hi",
    // });
    dispatch(getRoles());
    dispatch(signinUser());
  }, [dispatch]);

  const outerTheme = createTheme({
    palette: {
      primary: {
        light: '#8284f3',
        main: '#6366F1',
        dark: '#4547a8',
        contrastText: '#fff',
      },
    },
  });

  return (
      <ThemeProvider theme={outerTheme}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}

          </Route>
          <Route path="/class-details/:id" element={<ClassDetails/>}>
            <Route index element={<Feed/>}/>
            <Route path="assessments" element={<Assessments/>}/>
            <Route path="attendances" element={<Attendance/>}/>
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}

          </Route>
          <Route path="signup" element={<Signup/>}/>
          <Route path="signin" element={<Signin/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="verify" element={<AccountVerify/>}/>
          <Route path="institute/request" element={<CreateInstitute/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </ThemeProvider>
  );
}

function Layout() {
  return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Sign in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/institute/request">Request institute</Link>
            </li>
            <li>
              <Link to="/verify">Verify page</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
          </ul>
        </nav>

        <hr/>

        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet/>
      </div>
  );
}

function Home() {
  return (
      <div>
        <h2>Home</h2>
      </div>
  );
}
