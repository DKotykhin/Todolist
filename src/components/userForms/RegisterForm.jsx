import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Button, TextField, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { RegisterFormValidation } from "./FormValidation";
import { GetRegister } from "api/userrequests";

import "./style.scss";

function RegisterForm() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm(RegisterFormValidation);

    const onSubmit = (data) => {
        setLoading(true)
        // console.log(data)
        GetRegister(data)
            .then(function (response) {
                console.log("User", response.data.user.name, "has been added");
                reset();
                navigate("/login");
            })
            .catch(function (error) {
                console.log(error.response.data);
                setError(true);
                setLoading(false)
            });
    };

    return (
        <Container maxWidth="md" className="form">
            <Typography className="title" component="h2">
                {'Registration Form'}
            </Typography>
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
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField                           
                            error={errors.name ? true : false}
                            label="name"
                            variant="standard"                           
                            placeholder="your name"
                            helperText={errors.name?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField                            
                            error={errors.email ? true : false}
                            label="email"
                            variant="standard"
                            type="email"
                            placeholder="your email"
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
                            placeholder="enter password"
                            helperText={errors.password?.message}
                            {...field}
                        />
                    )}
                />
                <Button
                    disabled={!isValid}
                    className="submit_button"
                    type="submit"
                >
                    {'Register'}
                </Button>
            </Box>
            {error && 
            <Typography className="error_title">
                    {"Can't register user"}
            </Typography>
            }
            <Typography className="loading_title">
                        {loading ? "Registered..." : ""}
                    </Typography>
            <Typography className="subtitle">{'Already have account?'}</Typography>
            <Button className="submit_button" component={Link} to="/login">
                {'Login'}
            </Button>
        </Container>
    );
}

export default RegisterForm;
