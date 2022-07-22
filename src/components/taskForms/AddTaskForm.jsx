import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import {
    Button,
    TextField,
    Container,
    InputLabel,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import { AddTask } from "api/taskrequests";
import { addTask } from "store/taskSlice";
import { selectUser } from "store/selectors";
import { AddTaskFormValidation } from "components/userForms/FormValidation";
import TaskField from "../fields/TaskField";
import { collectData } from "helpers/formTextData";

import "./style.scss";

function AddTaskForm({ handleClose }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { userdata } = useSelector(selectUser);
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
        const newData = collectData(data)
        setLoading(true);
        AddTask(newData, userdata.token)
            .then(function (response) {
                dispatch(addTask(response.data.data));
                reset({
                    title: "",
                    subtitle: "",
                    description: "",
                });
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
                <TaskField
                    name={"title"}
                    control={control}
                    error={errors.title}
                    maxRows={2}
                    placeholder={"...add title"}
                />                
                <TaskField
                    name={"subtitle"}
                    control={control}                    
                    maxRows={2}
                    placeholder={"...add subtitle"}
                />                
                <TaskField
                    name={"desc"}
                    control={control}                    
                    maxRows={4}
                    placeholder={"...add description"}
                />
                <InputLabel
                    sx={{
                        m: 2,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    Deadline
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="date"
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 10),
                                }}
                                variant="outlined"
                            />
                        )}
                    />
                </InputLabel>
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
