import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Button, InputLabel, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

import { DeleteUser, UpdateUser } from "api/userrequests";
import { ProfileFormValidation } from "./FormValidation";
import AvatarForm from "./AvatarForm";

import './style.scss'

const ProfileForm = () => {
    const { userdata } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const {       
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        reset({
            name: userdata.user.name,
            age: userdata.user.age,
            email: userdata.user.email
        });
    }, [reset, userdata.user.age, userdata.user.email, userdata.user.name]);

    const handleDelete = (data) => {
        DeleteUser(data)
            .then(function (response) {
                navigate("/login");
                console.log("User", response.data.name, "has been deleted");
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const onSubmit = (data) => {        
        UpdateUser(data, userdata.token)
            .then(function (response) {
                const { data } = response;
                // console.log(response)
                console.log("New data: ", data);                
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    return (
        <Container maxWidth='xs' className="profile_form">            
            <Typography className="title" component="h2">
                User Profile
            </Typography>
            <Box className="profile_box"
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                // sx={{
                //     "& > :not(style)": {
                //         width: '20ch',
                //         display: "block",
                //         m: "50px auto",
                //     },
                // }}
                noValidate
                autoComplete="off"
            >
                <Box>
                    <InputLabel>Email</InputLabel>                    
                    <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField className="field"
                            {...field}
                            multiline
                            maxRows={2}
                            disabled                      
                            variant="standard"                                                     
                        />
                    )}
                />
                </Box>
                <Box>
                    <InputLabel>Change your name</InputLabel>                    
                    <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField className="field"
                            {...field}                            
                            error={errors.name ? true : false}                            
                            variant="standard"                           
                            placeholder="your name"
                            helperText={errors.name?.message}
                        />
                    )}
                />
                </Box>
                <Box>
                    <InputLabel>Change your age</InputLabel>                    
                    <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                        <TextField className="field"
                            {...field}
                            error={errors.age ? true : false}                            
                            variant="standard"                           
                            placeholder="your age"
                            helperText={errors.age?.message}
                        />
                    )}
                />
                </Box>
                <Button type="submit" variant="outlined" className="save_button">Save changes</Button>
            </Box>
            <AvatarForm />                
            <Typography className="subtitle">
                Need to delete Profile?
            </Typography>
            <Button 
                onClick={() => handleDelete(userdata.token)}
                color="error"
                variant="contained"
                className="delete"
                >
                    Delete
            </Button>
        </Container>
    );
};

export default ProfileForm;
