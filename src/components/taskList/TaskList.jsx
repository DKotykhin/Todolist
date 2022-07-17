import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { Box, Typography, Tab, Tabs, Container } from "@mui/material";

import { GetAllTasks } from "api/taskrequests";
import { createTasks } from "store/taskSlice";

import CardList from "components/cardList/CardList";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function TaskList() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const { userdata } = useSelector((state) => state.user);
    const { taskdata } = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const activeTasks = taskdata.filter((task) => task.completed === false);
    const completedTasks = taskdata.filter((task) => task.completed === true);

    const loadData = useCallback(() => {
        setLoading(true);
        GetAllTasks(userdata.token)
            .then(function (response) {
                // console.log('Get All Task', response.data);
                dispatch(createTasks(response.data.data));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    },[dispatch, userdata.token])

    useEffect(() => {
        loadData()
    }, [loadData]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth='xl'>            
            {loading && (
                <Typography sx={{ textAlign: "center", marginTop: '50px', fontSize: '22px' }}>
                    Loading...
                </Typography>
            )}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Active" {...a11yProps(1)} />
                    <Tab label="Done" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <CardList title={"All Tasks"} taskdata={taskdata} />               
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CardList title={"Active Tasks"} taskdata={activeTasks} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CardList title={"Completed Tasks"} taskdata={completedTasks} />
            </TabPanel>
        </Container>
    );
}
