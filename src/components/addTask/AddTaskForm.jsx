import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { Button, TextField, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import { AddTask } from "api/taskrequests";
import { addTask } from "store/taskSlice";
import { AddTaskFormValidation } from "components/userForms/FormValidation";

import "./style.scss";

function AddTaskForm({ handleClose }) {
    const { userdata } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm(AddTaskFormValidation);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [loaded]);

    const onSubmit = (data) => {
        const newData = {
            description: data.title.concat(
                "&#9000;",
                data.subtitle ? data.subtitle : "",
                "&#9000;",
                data.desc ? data.desc : ""
            ),
        };
        setLoading(true);
        AddTask(newData, userdata.token)
            .then(function (response) {
                dispatch(addTask(response.data.data));
                reset();
                setLoading(false);
                setLoaded(true);
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
                            error={errors.title ? true : false}
                            helperText={errors.title?.message}
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
                <Typography className="loading">
                    {loading ? "Loading..." : ""}
                    {loaded ? "Task add successfully!" : ""}
                </Typography>
                <Button
                    className="submitbutton"
                    type="submit"
                    disabled={!isValid}
                >
                    Add Task
                </Button>
            </Box>
        </Container>
    );
}

export default AddTaskForm;
