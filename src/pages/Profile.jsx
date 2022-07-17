import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ProfileForm from "components/profileList/ProfileForm";

const Profile = () => {
    const { userdata } = useSelector((state) => state.user);

    return userdata.token ? (
        <>
            <Helmet>
                <meta name="description" content="Profile Page" />
                <title>Profile Page</title>
            </Helmet>            
            <ProfileForm />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default Profile;
