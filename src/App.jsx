import * as React from "react";
import {Routes, Route} from "react-router-dom";
import {About} from "./pages/about";
import {Signup} from "./pages/signup";
import {ThemeProvider, createTheme} from "@mui/material";
import {Signin} from "./pages/signin";
import {NotFound} from "./pages/not-found";
import {AccountVerify} from "./pages/account-verify";
import {ForgotPassword} from "./pages/forgot-password";
import CreateInstitute from "./components/request-institute";
import {Dashboard} from "./pages/dashboard";
import {ClassDetails} from "./pages/class-details"
import {Feed} from "./pages/feed";
import {Assessments} from "./pages/assessments";
import Attendance from "./pages/attendance";
import {Participants} from "./pages/participants";
import {AuthorizedRoute, EnrouteToDashboard} from "./generic-services/authorized-routes";
import {Loader} from "./components/loader";
import ClassSettings from "./pages/class-settings";
import {DepartmentClasses} from "./pages/department-classes";
import DepartmentSettings from "./pages/department-settings";
import {InstituteDepartments} from "./pages/institute-departments";
import InstituteSettings from "./pages/institute-settings";
import Profile from './pages/profile';
import {CreateAssessment} from "./pages/create-assessment";
import LandingPage from "./pages/landing";
import Messenger from "./pages/messenger";
import {AttendanceDetails} from "./pages/attendance-details";
import {PollsPage} from "./pages/polls-page";
import AttemptInfo from "./pages/assessment-info";
import AttemptAssessment from "./pages/attempt-assessment";
import {ClassAssessmentPage} from "./pages/class-assessments";
import {EditAssessment} from "./pages/edit-assessment";
import ClassStats from "./pages/stats";
import StudentDetails from "./pages/student-details";
import AssessmentDetails from "./pages/assessment-details";
import UserAssessmentDetails from "./pages/user-assessment-details";
import {ResetPasswordPage} from "./pages/reset-password-page";
import Toasts from "./components/toasts";

export default function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch({
  //   //     type: "SET_USER_ACTION",
  //   //     hi: "hi",
  //   // });
  //   dispatch(addToast({ text: "Hello, World!", danger: true }));
  //   dispatch(addToast({ text: "Hello, World! 2" }));
  // }, [dispatch]);

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
        <Loader/>
        <Toasts/>
        <Routes>
          <Route path="/" element={<EnrouteToDashboard> <Layout/> </EnrouteToDashboard>}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}

          </Route>
          <Route path="/profile" element={<AuthorizedRoute> <Profile/> </AuthorizedRoute>}/>
          <Route path="/messenger" element={<AuthorizedRoute> <Messenger/> </AuthorizedRoute>}/>
          <Route path="/class-details/:id/" element={<AuthorizedRoute> <ClassDetails/> </AuthorizedRoute>}>
            <Route index element={<AuthorizedRoute> <Feed/> </AuthorizedRoute>}/>
            <Route path="attendances" element={<AuthorizedRoute> <Attendance/> </AuthorizedRoute>}/>
            <Route path="polls" element={<AuthorizedRoute> <PollsPage/> </AuthorizedRoute>}/>
            <Route path="participants/student-details" element={<AuthorizedRoute> <StudentDetails/> </AuthorizedRoute>}/>
            <Route path="participants" element={<AuthorizedRoute> <Participants/> </AuthorizedRoute>}/>
            <Route path="settings" element={<AuthorizedRoute> <ClassSettings/> </AuthorizedRoute>}/>
            <Route path="stats" element={<AuthorizedRoute> <ClassStats/> </AuthorizedRoute>}/>
            <Route path="assessments" element={<AuthorizedRoute> <ClassAssessmentPage/> </AuthorizedRoute>}/>
            <Route path="assessments/:assessment_id" element={<AuthorizedRoute> <AssessmentDetails/> </AuthorizedRoute>}/>
            <Route path="assessments/:assessment_id/details" element={<AuthorizedRoute> <UserAssessmentDetails/> </AuthorizedRoute>}/>
            <Route path="attendance/:attendance_id" element={<AuthorizedRoute> <AttendanceDetails/> </AuthorizedRoute>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>

          <Route path="assessment-info" element={<AuthorizedRoute> <AttemptInfo/> </AuthorizedRoute>}/>
          <Route path="assessment-info" element={<AuthorizedRoute> <AttemptInfo/> </AuthorizedRoute>}/>
          <Route path="attempt-assessment" element={<AuthorizedRoute> <AttemptAssessment/> </AuthorizedRoute>}/>

          <Route path="assessments" element={<AuthorizedRoute> <Assessments/> </AuthorizedRoute>}/>
          <Route path="/assessments/:id" element={<AuthorizedRoute> <Assessments/> </AuthorizedRoute>}/>
          <Route path="signup" element={<EnrouteToDashboard> <Signup/> </EnrouteToDashboard>}/>
          <Route path="signin" element={<EnrouteToDashboard> <Signin/> </EnrouteToDashboard>}/>
          <Route path="dashboard" element={<AuthorizedRoute> <Dashboard/> </AuthorizedRoute>}/>
          <Route path="/department/:id" element={<AuthorizedRoute> <DepartmentClasses/> </AuthorizedRoute>}/>
          <Route path="/department/:id/settings" element={<AuthorizedRoute> <DepartmentSettings/> </AuthorizedRoute>}/>
          <Route path="/institute/:id" element={<AuthorizedRoute> <InstituteDepartments/> </AuthorizedRoute>}/>
          <Route path="/institute/:id/settings" element={<AuthorizedRoute> <InstituteSettings/> </AuthorizedRoute>}/>
          <Route path="/class-details/:id/assessments/:assessment_id/details" element={<AuthorizedRoute> <UserAssessmentDetails/> </AuthorizedRoute>}/>

          <Route path="/assessment/create" element={<AuthorizedRoute> <CreateAssessment/> </AuthorizedRoute>}/>

          <Route path="/assessment/:id" element={<AuthorizedRoute> <EditAssessment/> </AuthorizedRoute>}/>

          <Route path="verify" element={<AccountVerify/>}/>
          <Route path="institute/request" element={ <AuthorizedRoute> <CreateInstitute/> </AuthorizedRoute>}/>
          <Route path="forgot-password" element={<EnrouteToDashboard> <ForgotPassword/> </EnrouteToDashboard>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </ThemeProvider>
  );
}

function Layout() {
  return (
    <LandingPage/>
  );
}

function Home() {
  return (
      <div>
        <h2>Home</h2>
      </div>
  );
}
