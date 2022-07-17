import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import PasswordForm from "components/userForms/PasswordForm";
import { selectUser } from "store/selectors";

const Password = () => {
    const { userdata } = useSelector(selectUser);

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