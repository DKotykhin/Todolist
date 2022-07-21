import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import {
    Button,
    Container,
    Typography,
    Checkbox,
    InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

import { UpdateTask } from "api/taskrequests";
import { updateTaskAll } from "store/taskSlice";
import { selectUser } from "store/selectors";
import { AddTaskFormValidation } from "components/userForms/FormValidation";
import FormField from "./FormField";

import "./style.scss";

const transformData = (data) => {
    const newData = {
        description: data.title.concat(
            "&#9000;",
            data.subtitle ? data.subtitle : "",
            "&#9000;",
            data.desc ? data.desc : "",
            "&#9000;",
            data.date ? data.date : ""
        ),
        completed: data.completed || false,
    };
    return newData
}

function UpdateTaskForm({ props, handleClose }) {
    const { userdata } = useSelector(selectUser);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm(AddTaskFormValidation);

    const title = props.description.split("&#9000;")[0];
    const subtitle = props.description.split("&#9000;")[1];
    const desc = props.description.split("&#9000;")[2];
    const date = props.description.split("&#9000;")[3];

    useEffect(() => {
        reset({
            title,
            subtitle,
            desc,
            date,
        });
    }, [desc, reset, subtitle, title, date]);

    const onSubmit = (data) => {
        const newData = transformData(data)
        setLoading(true);
        UpdateTask(newData, userdata.token, props._id)
            .then(function (response) {
                // console.log('Update Task', response.data);
                handleClose();
                dispatch(updateTaskAll(response.data.data));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    return (
        <Container maxWidth="md" className="task_form">
            <CloseIcon className="modal_close" onClick={handleClose} />
            <Typography className="title">{"Update task"}</Typography>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
            >
                <FormField
                    name={"title"}
                    control={control}
                    error={errors.title}
                    maxRows={2}
                />
                <FormField name={"subtitle"} control={control} maxRows={2} />
                <FormField name={"description"} control={control} maxRows={4} />
                <InputLabel className="date_label">
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
                <InputLabel sx={{ mt: 2, textAlign: "center" }}>
                    <Controller
                        name="completed"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                {...field}
                                defaultChecked={props.completed}
                            />
                        )}
                    />
                    Completed
                </InputLabel>
                <Typography className="loading">
                    {loading ? "Loading..." : ""}
                </Typography>
                <Button
                    className="submitbutton"
                    type="submit"
                    disabled={!isValid}
                >
                    Update Task
                </Button>
            </Box>
        </Container>
    );
}

export default UpdateTaskForm;
