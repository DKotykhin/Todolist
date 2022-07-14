import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Suspense, lazy } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "components/layout/Layout";
// import Spinner from "components/spinner/Spinner";

import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Registration from "pages/Registration";
import Page404 from "pages/Page404";
import Password from "pages/Password";

// const Home = lazy(() => import("pages/Home"));
// const Login = lazy(() => import("pages/Login"));
// const Profile = lazy(() => import("pages/Profile"));
// const Registration = lazy(() => import("pages/Registration"));
// const Page404 = lazy(() => import("pages/Page404"));

const theme = createTheme({
    palette: {
        primary: {
            main: "#00a1b6",
        },
    },
});

function App() {
    return (
        <Router>
            {/* <Suspense fallback={<Spinner />}> */}
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="registration" element={<Registration />} />
                        <Route path="password" element={<Password />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </ThemeProvider>
            {/* </Suspense> */}
        </Router>
    );
}

export default App;
