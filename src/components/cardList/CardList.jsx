import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Container, Typography, Grid } from "@mui/material";

import { DeleteTask, UpdateTask } from "api/taskrequests";
import { removeTask, updateTaskCompleted } from "store/taskSlice";
import { selectUser } from "store/selectors";

import ShortCard from "components/card/ShortCard";
import AddTaskModal from "components/taskForms/AddTaskModal";
import FieldSort from "components/cardSort/FieldSort";
import AZSort from "components/cardSort/AZSort";
import UpdateTaskModal from "components/taskForms/UpdateTaskModal";
import SortAction from "./SortAction";
import FullCardModal from "components/card/FullCardModal";

const CardList = ({ taskdata }) => {
    const [loading, setLoading] = useState(false);
    const [cardUpdateData, setCardUpdateData] = useState([]);
    const [newTaskdata, setNewTaskdata] = useState([]);
    const [sortOrder, setSortOrder] = useState("A-z");
    const [sortField, setSortField] = useState("created");
    const [updateFormOpen, setUpdateFormOpen] = useState(false);
    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullDataId, setCardFullDataId] = useState(null);

    const { userdata } = useSelector(selectUser);
    const dispatch = useDispatch();

    const newcardFullData = taskdata.filter(
        (task) => task._id === cardFullDataId
    );

    useEffect(() => {
        setNewTaskdata(SortAction(taskdata, sortField, sortOrder));
    }, [sortField, sortOrder, taskdata]);
    // const newTaskdata = SortAction(taskdata, sortField, sortOrder)

    const updateFormClose = () => {
        setUpdateFormOpen(false);
    };

    const handleDelete = (id) => {
        setLoading(true);
        setCardFullOpen(false);
        DeleteTask(userdata.token, id)
            .then(function (response) {
                // console.log('Delete task response: ', response.data);
                dispatch(removeTask(id));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    const handleComplete = (data) => {
        setLoading(true);
        const newData = { completed: !data.completed };
        UpdateTask(newData, userdata.token, data._id)
            .then(function (response) {
                // console.log('Update task response: ', response.data);
                dispatch(updateTaskCompleted(data._id));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    const handleUpdate = (data) => {
        setUpdateFormOpen(true);
        setCardUpdateData(data);
    };

    const FieldSelect = (data) => {
        setSortField(data);
    };
    const AZSelect = (data) => {
        setSortOrder(data);
    };

    const handleOpen = (data) => {
        setCardFullOpen(true);
        setCardFullDataId(data);
    };

    const fullCardClose = () => {
        setCardFullOpen(false);
    };

    return (
        <Container maxWidth="xl">
            <UpdateTaskModal
                props={cardUpdateData}
                openModal={updateFormOpen}
                closeModal={updateFormClose}
            />
            <FullCardModal
                props={newcardFullData[0]}
                openModal={cardFullOpen}
                closeModal={fullCardClose}
                handleDelete={() => handleDelete(newcardFullData[0]._id)}
                handleComplete={() => handleComplete(newcardFullData[0])}
                handleUpdate={() => handleUpdate(newcardFullData[0])}
            />
            <Box sx={{ textAlign: "center" }}>
                <AddTaskModal />
            </Box>
            {loading ? (
                <Typography
                    sx={{ fontSize: "18px", my: 1, textAlign: "center" }}
                >
                    {"Loading..."}
                </Typography>
            ) : (
                <Typography
                    color="text.secondary"
                    sx={{ fontSize: "18px", my: 1, textAlign: "center" }}
                >
                    {newTaskdata.length
                        ? `Total amount: ${newTaskdata.length}`
                        : "No cards"}
                </Typography>
            )}
            {newTaskdata.length > 1 && (
                <>
                    <FieldSort onSelect={FieldSelect} />
                    <AZSort onSelect={AZSelect} />
                </>
            )}
            <Grid container>
                {newTaskdata?.map((task) => (
                    <Grid item xs={12} md={6} xl={4} key={task._id}>
                        <Box
                            sx={{
                                m: 1,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <ShortCard
                                props={task}
                                // handleDelete={() => handleDelete(task._id)}
                                // handleComplete={() => handleComplete(task)}
                                // handleUpdate={() => handleUpdate(task)}
                                handleOpen={() => handleOpen(task._id)}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CardList;
