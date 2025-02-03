import "./styles/App.css";
import "./styles/Calendar.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Controller/AuthController";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Dashboard from "./pages/Views/Dashboard";
import UsageMonitor from "./pages/Views/UsageMonitor";
import Janitors from "./pages/Views/Janitors";
import Resources from "./pages/Views/Resources";
import Settings from "./pages/Views/Settings";
import Users from "./pages/Views/Users";
import Profile from "./pages/Views/Profile";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import LoginDesktop from "./pages/Auth/desktop/Login";
import SignupDesktop from "./pages/Auth/desktop/Signup";
import LoginMobile from "./pages/Auth/mobile/Login";
import SignupMobile from "./pages/Auth/mobile/Signup";
import DashboardDesktop from "./pages/Views/desktop/Dashboard";

import UsageMonitorDesktop from "./pages/Views/desktop/UsageMonitor";
import JanitorsDesktop from "./pages/Views/desktop/Janitors";
import ResourcesDesktop from "./pages/Views/desktop/Resources";
import SettingsDesktop from "./pages/Views/desktop/Settings";
import UsersDesktop from "./pages/Views/desktop/Users";
import ProfileDesktop from "./pages/Views/desktop/Profile";
import DashboardMobile from "./pages/Views/mobile/Dashboard";
import UsageMonitorMobile from "./pages/Views/mobile/UsageMonitor";
import JanitorsMobile from "./pages/Views/mobile/Janitors";
import ResourcesMobile from "./pages/Views/mobile/Resources";
import SettingsMobile from "./pages/Views/mobile/Settings";
import UsersMobile from "./pages/Views/mobile/Users";
import ProfileMobile from "./pages/Views/mobile/Profile";
import ResponsiveDashboard from "./pages/Views/ResponsiveViews/ResponsiveDashboard";



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login-desktop" element={<LoginDesktop />} />
            <Route path="/signup-desktop" element={<SignupDesktop />} />
            <Route path="/login-mobile" element={<LoginMobile />} />
            <Route path="/signup-mobile" element={<SignupMobile />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Nav />}>
                <Route path="dashboard" element={<ResponsiveDashboard />} />
                <Route path="janitors" element={<Janitors />} />
                <Route path="resources" element={<Resources />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
                <Route path="user_profile" element={<Profile />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="usage-monitor" element={<UsageMonitor />} />
                <Route path="dashboard-desktop" element={<DashboardDesktop />} />
                <Route path="usage-monitor-desktop" element={<UsageMonitorDesktop />} />
                <Route path="janitors-desktop" element={<JanitorsDesktop />} />
                <Route path="resources-desktop" element={<ResourcesDesktop />} />
                <Route path="settings-desktop" element={<SettingsDesktop />} />
                <Route path="users-desktop" element={<UsersDesktop />} />
                <Route path="profile-desktop" element={<ProfileDesktop />} />
                <Route path="dashboard-mobile" element={<DashboardMobile />} />
                <Route path="usage-monitor-mobile" element={<UsageMonitorMobile />} />
                <Route path="janitors-mobile" element={<JanitorsMobile />} />
                <Route path="resources-mobile" element={<ResourcesMobile />} />
                <Route path="settings-mobile" element={<SettingsMobile />} />
                <Route path="users-mobile" element={<UsersMobile />} />
                <Route path="profile-mobile" element={<ProfileMobile />} />

                
                
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
