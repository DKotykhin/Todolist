import Helmet from "react-helmet";

import LoginForm from "components/userForms/LoginForm";

const Login = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Login Page" />
                <title>Login Page</title>
            </Helmet>            
            <LoginForm />                
        </>
    )
}

export default Login;