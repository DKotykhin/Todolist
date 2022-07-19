import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Button, Container, Typography, Box } from "@mui/material";
import { TextField, InputLabel, Checkbox } from "@mui/material";

import { createUser } from "store/userSlice";
import { GetLogin, GetLoginViaToken } from "api/userrequests";
import { LoginFormValidation } from "./FormValidation";

import "./style.scss";

function LoginForm() {
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm(LoginFormValidation);

    useEffect(() => {
        const token = localStorage.getItem("rememberMe");
        if (token) {
            GetLoginViaToken(token)
                .then(function (response) {
                    // console.log('response from login via token', response)
                    const loginData = { token: token, user: response.data };
                    dispatch(createUser(loginData));
                    navigate("/");                    
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    setLogin(true);
                });
        } else {
            setLogin(true);
        }
    }, [dispatch, navigate]);

    const onSubmit = (formdata) => {
        setLogin(false)
        GetLogin(formdata)
            .then(function (response) {
                // console.log('Token: ', data.token);
                // console.log('User: ', data.user);
                if (formdata.rememberMe) {
                    localStorage.setItem("rememberMe", response.data.token);
                }
                reset();
                dispatch(createUser(response.data));
                navigate("/");
            })
            .catch(function (error) {
                console.log(error.response.data);
                setError(true);
                setLogin(true)
            });
    };

    return (
        <Container maxWidth="xs" className="form">
            <Typography className="title" component="h2">
                {login ? "Login" : "Loading..."}
            </Typography>
            {login && (
                <>
                    <Box
                        onSubmit={handleSubmit(onSubmit)}
                        component="form"
                        sx={{
                            "& > :not(style)": {
                                width: "30ch",
                                display: "block",
                                m: "50px auto",
                            },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    error={errors.email ? true : false}
                                    label="email"
                                    variant="standard"
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
                                    variant="standard"
                                    type="password"
                                    placeholder="password"
                                    helperText={errors.password?.message}
                                    {...field}
                                />
                            )}
                        />
                        <InputLabel>
                            <Controller
                                name="rememberMe"
                                control={control}
                                render={({ field }) => <Checkbox {...field} />}
                            />
                            Remember me
                        </InputLabel>
                        <Button
                            disabled={!isValid}
                            className="submit_button"
                            type="submit"
                        >
                            Login
                        </Button>
                    </Box>                  
                    {error && (
                        <Typography className="error_title">
                            {"Incorrect data!"}
                        </Typography>
                    )}                                       
                    <Typography className="subtitle">
                        {"Don't have account?"}
                    </Typography>
                    <Button
                        className="submit_button"
                        component={Link}
                        to="/registration"
                    >
                        Registration
                    </Button>
                </>
            )}
        </Container>
    );
}

export default LoginForm;
