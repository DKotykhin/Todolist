import { Outlet } from "react-router-dom";

import NavBar from "components/navBar/NavBar";

const Layout = () => {
    return(
        <>
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;