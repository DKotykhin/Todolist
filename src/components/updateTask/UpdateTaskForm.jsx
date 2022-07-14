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

import "./style.scss";

function UpdateTaskForm({ props, handleClose }) {
    const { userdata } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { control, handleSubmit, reset } = useForm();

    const title = props.description.split("&#9000;")[0];
    const subtitle = props.description.split("&#9000;")[1];
    const desc = props.description.split("&#9000;")[2];

    useEffect(() => {
        reset({
            title,
            subtitle,
            desc,
        });
    }, [desc, reset, subtitle, title]);

    const onSubmit = (data) => {
        const newData = {
            description: data.title.concat(
                "&#9000;",
                data.subtitle,
                "&#9000;",
                data.desc
            ),
            completed: data.completed || false,
        };
        setLoading(true);
        UpdateTask(newData, userdata.token, props._id)
            .then(function (response) {
                // console.log(response);
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
                <InputLabel>
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
                {loading && (
                    <Typography className="loading">Loading...</Typography>
                )}
                <Button className="submitbutton" type="submit">
                    Update Task
                </Button>
            </Box>
        </Container>
    );
}

export default UpdateTaskForm;
