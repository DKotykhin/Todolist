import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { Button, TextField, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import { AddTask } from "api/taskrequests";
import { addTask } from "store/taskSlice";

import "./style.scss";

function AddTaskForm({ handleClose }) {
    const { userdata } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const newData = {
            description: data.title.concat(
                "&#9000;",
                data.subtitle,
                "&#9000;",
                data.desc
            ),
        };
        setLoading(true);
        AddTask(newData, userdata.token)
            .then(function (response) {
                dispatch(addTask(response.data.data));
                reset();
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    return (
        <Container maxWidth="md" className="task_form">
            <CloseIcon className="modal_close" onClick={handleClose} />
            <Typography className="title">{"Add new task"}</Typography>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            className="field"
                            {...field}
                            multiline
                            maxRows={2}
                            label="title"
                            variant="outlined"
                            type="text"
                            placeholder="...add title"
                        />
                    )}
                />
                <Controller
                    name="subtitle"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            className="field"
                            {...field}
                            multiline
                            maxRows={2}
                            label="subtitle"
                            variant="outlined"
                            type="text"
                            placeholder="...add subtitle"
                        />
                    )}
                />
                <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            className="field"
                            {...field}
                            multiline
                            maxRows={4}
                            label="description"
                            variant="outlined"
                            placeholder="...add description"
                        />
                    )}
                />
                {loading && (
                    <Typography className="loading">Loading...</Typography>
                )}
                <Button className="submitbutton" type="submit">
                    Add Task
                </Button>
            </Box>
        </Container>
    );
}

export default AddTaskForm;
