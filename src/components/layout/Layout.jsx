import { Outlet } from "react-router-dom";

import NavBar from "components/navBar/NavBar";
import Footer from "components/footer/Footer";

const Layout = () => {
    return(
        <div className="container">
            <header>
                <NavBar/>
            </header>
            <main style={{'min-height': 'calc(100vh - 170px)'}}>
                <Outlet/>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout;