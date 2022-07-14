import Helmet from "react-helmet";

import Error from "../components/error/Error";

const Page404 = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Error Page" />
                <title>Error Page</title>
            </Helmet>            
            <Error/>
        </>
    )
}

export default Page404;