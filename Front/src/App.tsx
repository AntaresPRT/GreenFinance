import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {CssBaseline, CssVarsProvider, extendTheme} from "@mui/joy";
import {LoginPage} from "./pages/LoginPage";
import {ProjectsPage} from "./pages/ProjectsPage";
import {ProjectInfoPage} from "./pages/ProjectInfoPage";
import {ProfilePage} from "./pages/ProfilePage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {CompanyInfoPage} from "./pages/CompanyInfoPage";

;

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/registration",
        element: <RegistrationPage/>,
    },
    {
        path: "/projects",
        element: <ProjectsPage/>,
    },
    {
        path: "/project/:projectId",
        element: <ProjectInfoPage/>,
    },
    {
        path: "/organisation/:organisationId",
        element: <CompanyInfoPage/>,
    },
    {
        path: "/profile",
        element: <ProfilePage/>,
    }
]);

const theme = extendTheme({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        50: '#e7f7e4',
                        100: '#c8edc0',
                        200: '#a6e39a',
                        300: '#85d875',
                        400: '#6ccc5e',
                        500: '#50B848', // основной
                        600: '#42963b',
                        700: '#33742e',
                        800: '#245320',
                        900: '#143314',

                        plainColor: '#50B848',
                        plainHoverBg: '#e7f7e4',
                        plainActiveBg: '#c8edc0',

                        softColor: '#33742e',
                        softBg: '#edf9ec',
                        softHoverBg: '#d9f2d4',
                        softActiveBg: '#c1e8b9',

                        outlinedColor: '#50B848',
                        outlinedBorder: '#a6e39a',
                        outlinedHoverBg: '#e7f7e4',
                        outlinedActiveBg: '#d9f2d4',

                        solidColor: '#ffffff',
                        solidBg: '#50B848',
                        solidHoverBg: '#42963b',
                        solidActiveBg: '#33742e',
                    },
                    neutral: {
                        // мягкие серые для фонов и границ
                        50: '#f8f9fa',
                        100: '#e9ecef',
                        200: '#dee2e6',
                        300: '#ced4da',
                        400: '#adb5bd',
                        500: '#6c757d',
                    },
                    text: {
                        primary: '#1a1a1a',
                        secondary: '#4f5b62',
                        tertiary: '#6c757d',
                    },
                    background: {
                        body: '#eeefef',
                        surface: '#ffffff',
                        level1: '#ffffff',
                        level2: '#f6f7f8',
                        level3: '#eceff1',
                    },
                },
            },
            dark: {
                palette: {
                    primary: {
                        50: '#e7f7e4',
                        100: '#c8edc0',
                        200: '#a6e39a',
                        300: '#85d875',
                        400: '#6ccc5e',
                        500: '#50B848', // основной
                        600: '#42963b',
                        700: '#33742e',
                        800: '#245320',
                        900: '#143314',

                        plainColor: '#50B848',
                        plainHoverBg: '#e7f7e4',
                        plainActiveBg: '#c8edc0',

                        softColor: '#33742e',
                        softBg: '#edf9ec',
                        softHoverBg: '#d9f2d4',
                        softActiveBg: '#c1e8b9',

                        outlinedColor: '#50B848',
                        outlinedBorder: '#a6e39a',
                        outlinedHoverBg: '#e7f7e4',
                        outlinedActiveBg: '#d9f2d4',

                        solidColor: '#ffffff',
                        solidBg: '#50B848',
                        solidHoverBg: '#42963b',
                        solidActiveBg: '#33742e',
                    },
                    neutral: {
                        50: '#2a2e32',
                        100: '#3a3e41',
                        200: '#4a4f53',
                        300: '#5a5f63',
                        400: '#6a7075',
                        500: '#7a8085',
                    },
                    text: {
                        primary: '#f1f3f5',
                        secondary: '#c1c5c9',
                        tertiary: '#9aa0a5',
                    },
                    background: {
                        body: '#121416',
                        surface: '#1a1d1f',
                        level1: '#1c1f21',
                        level2: '#2c2f31',
                        level3: '#3a3e41',
                    },
                }
            },
        },
    })
;

function App() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline/>
            <React.StrictMode>
                <RouterProvider router={router}/>
            </React.StrictMode>
        </CssVarsProvider>
    );
}

export default App;
