import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Button, TextField, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { RegisterFormValidation } from "./FormValidation";
import { GetRegister } from "api/userrequests";

import "./style.scss";

function RegisterForm() {
    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm(RegisterFormValidation);

    const onSubmit = (data) => {
        // console.log(data)
        GetRegister(data)
            .then(function (response) {
                navigate("/login");
                console.log("User", response.data.name, "has been added");
                reset();
            })
            .catch(function (error) {
                console.log(error.response.data);
                setError(true)
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
                        width: "35ch",
                        display: "block",
                        m: "50px auto",
                    },
                }}                
                noValidate
                autoComplete="off"
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
                    className="submitbutton"
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
            <Typography className="subtitle">{'Already have account?'}</Typography>
            <Button className="regbutton" component={Link} to="/login">
                {'Login'}
            </Button>
        </Container>
    );
}

export default RegisterForm;
