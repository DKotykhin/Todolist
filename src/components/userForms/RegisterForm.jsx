import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { RegisterFormValidation } from "./FormValidation";
import { GetRegister } from "api/userrequests";

import "./style.scss";
import EmailField from "../fields/EmailField";
import PassField from "../fields/PassField";
import NameField from "components/fields/NameField";

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
        setLoading(true);
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
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="md" className="form">
            <Typography className="title" component="h2">
                {"Registration Form"}
            </Typography>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    "& > :not(style)": {
                        width: "300px",
                        display: "block",
                        m: "50px auto",
                    },
                }}
                // noValidate
                // autoComplete="off"
            >
                <NameField error={errors.name} control={control} />
                <EmailField error={errors.email} control={control} />
                <PassField
                    name={"password"}
                    title={"password"}
                    error={errors.password}
                    control={control}
                />
                <Button
                    disabled={!isValid}
                    className="submit_button"
                    type="submit"
                >
                    {"Register"}
                </Button>
            </Box>
            {error && (
                <Typography className="error_title">
                    {"Can't register user"}
                </Typography>
            )}
            <Typography className="loading_title">
                {loading ? "Registered..." : ""}
            </Typography>
            <Typography className="subtitle">
                {"Already have account?"}
            </Typography>
            <Button className="submit_button" component={Link} to="/login">
                {"Login"}
            </Button>
        </Container>
    );
}

export default RegisterForm;
