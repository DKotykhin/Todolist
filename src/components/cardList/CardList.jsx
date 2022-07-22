import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Container, Typography, Grid } from "@mui/material";

import { DeleteTask, UpdateTask } from "api/taskrequests";
import { removeTask, updateTaskCompleted } from "store/taskSlice";
import { selectUser } from "store/selectors";

import BasicCard from "components/cardList/Card";
import AddTaskModal from "components/taskForms/AddTaskModal";
import FieldSort from "components/cardSort/FieldSort";
import AZSort from "components/cardSort/AZSort";
import UpdateTaskModal from "components/taskForms/UpdateTaskModal";
import SortAction from "./SortAction";

const CardList = ({ taskdata }) => {
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [newTaskdata, setNewTaskdata] = useState([]);
    const [sortOrder, setSortOrder] = useState("A-z");
    const [sortField, setSortField] = useState("created");
    const [open, setOpen] = useState(false);

    const { userdata } = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        setNewTaskdata(SortAction(taskdata, sortField, sortOrder));
    }, [sortField, sortOrder, taskdata]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (id) => {
        setLoading(true);
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
        setOpen(true);
        setCardData(data);
    };

    const FieldSelect = (data) => {
        setSortField(data);
    };
    const AZSelect = (data) => {
        setSortOrder(data);
    };

    return (
        <Container maxWidth="xl">
            <UpdateTaskModal
                props={cardData}
                openModal={open}
                closeModal={handleClose}
            />
            <Box sx={{ textAlign: "center" }}>
                <AddTaskModal />
            </Box>
            {loading ? (
                <Typography
                    sx={{ fontSize: "18px", mt: 1, textAlign: "center" }}
                >
                    {"Loading..."}
                </Typography>
            ) : (
                <Typography
                    color="text.secondary"
                    sx={{ fontSize: "18px", mt: 1, textAlign: "center" }}
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
                            <BasicCard
                                props={task}
                                handleDelete={() => handleDelete(task._id)}
                                handleComplete={() => handleComplete(task)}
                                handleUpdate={() => handleUpdate(task)}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CardList;
