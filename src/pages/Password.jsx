import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import PasswordForm from "components/userForms/PasswordForm";

const Password = () => {
    const { userdata } = useSelector((state) => state.user);

    return userdata.token ? (
        <>
            <Helmet>
                <meta name="description" content="Change Password Page" />
                <title>Change Password Page</title>
            </Helmet>            
            <PasswordForm />
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default Password;