import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import TaskList from "components/taskList/TaskList";
import { selectUser } from "store/selectors";

const Home = () => {    
    const { userdata } = useSelector(selectUser);

    return userdata.token ? (
        <>
            <Helmet>
                <meta name="description" content="Home Page" />
                <title>Home Page</title>
            </Helmet>            
            <TaskList />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default Home;
