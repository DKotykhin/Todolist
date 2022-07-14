import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Container, Typography, Grid, Modal } from "@mui/material";

import { DeleteTask, UpdateTask } from "api/taskrequests";
import { removeTask, updateTaskCompleted } from "store/taskSlice";

import BasicCard from "components/tasks/Card";
import ModalAdd from "components/addTask/ModalAdd";
import UpdateTaskForm from "components/updateTask/UpdateTaskForm";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '80%',
    maxWidth: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
};

const CardList = ({ taskdata }) => {
    const { userdata } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState();

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (id) => {        
        setLoading(true);
        DeleteTask(userdata.token, id)
            .then(function (response) {
                // console.log(response);
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
                // console.log(response);
                dispatch(updateTaskCompleted(data._id));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    const handleUpdate = (data) => {        
        setOpen(true);
        setCardData(data)
    };

    return (
        <Container>           
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UpdateTaskForm props={cardData} handleClose={handleClose} />
                </Box>
            </Modal>
            <Box sx={{ textAlign: "center" }}>
                <ModalAdd />
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
                    {"Total amount: "}
                    {taskdata.length}
                </Typography>
            )}
            <Grid container>
                {taskdata.map((task) => (
                    <Grid item xs={12} md={6} xl={4} key={task._id}>
                        <Box sx={{ m: 2 }}>
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
