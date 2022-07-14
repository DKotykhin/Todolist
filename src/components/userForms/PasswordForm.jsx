import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { Button, TextField, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { UpdateUser } from "api/userrequests";
import { PasswordFormValidation } from "./FormValidation";

import "./style.scss";

function PasswordForm() {
    const { userdata } = useSelector((state) => state.user);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [matchPass, setMatchPass] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm(PasswordFormValidation);

    const onSubmit = (data) => {
        if (data.password === data.confirmpassword) {           
            setMatchPass(false)
            const newData = { password: data.confirmpassword }
            UpdateUser(newData, userdata.token)
                .then(function (response) {                    
                    reset();
                    setSuccess(true)                    
                    // console.log("New data: ", response.data);                
                })
                .catch(function (error) {
                    console.log(error.message);
                    setError(true)
                });        
        } else {
            console.log('don`t match', data)
            setMatchPass(true)
        }
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
                    {'Change password'}
                </Typography>
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
                <Controller
                    name="confirmpassword"
                    control={control}
                    render={({ field }) => (
                        <TextField                            
                            error={errors.confirmpassword ? true : false}
                            label="confirm password"
                            variant="outlined"
                            type="password"
                            placeholder="confirm password"
                            helperText={errors.confirmpassword?.message}
                            {...field}
                        />
                    )}
                />
                <Button
                    disabled={!isValid}
                    className="submitbutton"
                    type="submit"
                >
                    Change password
                </Button>
            </Box>
            {error && 
                <Typography className="error_title">
                        {'Incorrect data!'}
                </Typography>
            }
            {matchPass && 
                <Typography className="error_title">
                        {"Passwords don't match!"}
                </Typography>
            }
            {success &&
                <Typography 
                    className="subtitle" 
                    color={'primary'}
                >
                    {"Password successfully changed!"}
                </Typography>
            }
            
        </Container>
    );
}

export default PasswordForm;
