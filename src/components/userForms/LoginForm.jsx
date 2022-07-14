import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Button, TextField, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { createUser } from "store/userSlice";
import { GetLogin } from "api/userrequests";
import { LoginFormValidation } from "./FormValidation";

import "./style.scss";

function LoginForm() {
    const [error, setError] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm(LoginFormValidation);

    const onSubmit = (data) => {
        GetLogin(data)
            .then(function (response) {
                const { data } = response;
                reset();
                dispatch(createUser(data));
                navigate("/");
                // console.log('Token: ', data.token);
                // console.log('User: ', data.user);
            })
            .catch(function (error) {
                console.log(error.response.data);
                setError(true)
            });
    };

    return (
        <Container maxWidth="md" className="form">
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    "& > :not(style)": {
                        width: "25ch",
                        display: "block",
                        m: "50px auto",
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography className="title" component="h2">
                    {'Login'}
                </Typography>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField                            
                            error={errors.email ? true : false}
                            label="email"
                            variant="outlined"
                            type="email"
                            placeholder="email"
                            helperText={errors.email?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField                            
                            error={errors.password ? true : false}
                            label="password"
                            variant="outlined"
                            type="password"
                            placeholder="password"
                            helperText={errors.password?.message}
                            {...field}
                        />
                    )}
                />
                <Button
                    disabled={!isValid}
                    className="submitbutton"
                    type="submit"
                >
                    Login
                </Button>
            </Box>
            {error && 
            <Typography className="error_title">
                    {'Incorrect data!'}
            </Typography>
            }
            <Typography className="subtitle">{"Don't have account?"}</Typography>
            <Button className="regbutton" component={Link} to="/registration">
                Registration
            </Button>
        </Container>
    );
}

export default LoginForm;
