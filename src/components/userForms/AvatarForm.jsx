import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { UploadAvatar, DeleteAvatar } from "api/userrequests";

import "./style.scss";
import { useState } from "react";

const AvatarForm = () => {
    const { userdata } = useSelector((state) => state.user);
    const {
        register,
        reset,
        handleSubmit,
        // formState: { errors },
    } = useForm();
    const [loadedAvatar, setLoadedAvatar] = useState(false)
    const [deletedAvatar, setDeletedAvatar] = useState(false)

    const onSubmit = (data) => {
        setLoadedAvatar(false);
        setDeletedAvatar(false)
        var formData = new FormData();
        formData.append("avatar", data.avatar[0]);
        UploadAvatar(formData, userdata.token)
            .then(function (response) {
                console.log(response.data);
                setLoadedAvatar(true)
                reset()
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const handleDelete = () => {
        setLoadedAvatar(false);
        setDeletedAvatar(false)
        DeleteAvatar(userdata.token)
        .then(function (response) {
            console.log(response.data);
            setDeletedAvatar(true)
        })
        .catch(function (error) {
            console.log(error.message);
        }); 
    }

    return (
        <Container maxWidth="xs" className="profile_form">
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    "& > :not(style)": {
                        width: "30ch",
                        display: "block",
                        m: "30px auto",
                    },
                }}
                noValidate
                autoComplete="off"
                >               
                <Typography sx={{cursor: 'pointer'}}
                    component='input'                    
                    {...register("avatar")} 
                    color='primary'
                    type="file"                    
                />                            
                <Button
                    type="submit"
                    variant="outlined"
                    className="save_button"
                >
                    Upload
                </Button>
            </Box>
            {loadedAvatar && 
            <Typography color='primary' sx={{textAlign: 'center', mb: 5}}>{'Avatar loaded succesfully'}</Typography>
            }
            <Button 
                onClick={handleDelete}
                variant="outlined"
                color="error"
                sx={{display: 'block', margin: '20px auto', mt:5}}
            >
                Delete Avatar
            </Button>
            {deletedAvatar &&
                <Typography color='error' sx={{textAlign: 'center', mb: 5}}>{'Avatar deleted succesfully'}</Typography>
            }
        </Container>
    );
};

export default AvatarForm;
