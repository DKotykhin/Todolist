import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { UploadAvatar, DeleteAvatar } from "api/userrequests";
import DeleteAvatarModal from "./DeleteAvatarModal";
import { selectUser } from "store/selectors";

import './profilelist.scss';

const AvatarForm = () => {
    const [loadedAvatar, setLoadedAvatar] = useState(false);
    const [deletedAvatar, setDeletedAvatar] = useState(false);
    const { userdata } = useSelector(selectUser);
    
    const {
        register,
        reset,
        handleSubmit,        
    } = useForm();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadedAvatar(false);
            setDeletedAvatar(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [loadedAvatar, deletedAvatar]);

    const onSubmit = (data) => {        
        var formData = new FormData();
        formData.append("avatar", data.avatar[0], data.avatar[0].name);
        UploadAvatar(formData, userdata.token)
            .then(function (response) {
                console.log(response.data);
                setLoadedAvatar(true);
                reset();                               
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const handleDelete = () => {
        setLoadedAvatar(false);
        setDeletedAvatar(false);
        DeleteAvatar(userdata.token)
            .then(function (response) {
                console.log(response.data);
                setDeletedAvatar(true);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    return (
        <Container maxWidth="xs" className="profile_form">
            <Typography className="title">
                Change Avatar
            </Typography>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    "& > :not(style)": {
                        width: "30ch",
                        display: "block",
                        m: "20px auto",
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography
                    sx={{ cursor: "pointer" }}
                    component="input"
                    {...register("avatar")}
                    color="primary"
                    type="file"
                />
                <Button
                    type="submit"
                    variant="outlined"                                    
                >
                    Upload
                </Button>
            </Box>            
            <Typography color="primary" sx={{ textAlign: "center", minHeight: '25px' }}>
                {loadedAvatar ? "Avatar loaded succesfully" : ''}
            </Typography>          
            <DeleteAvatarModal handleDelete={handleDelete}/>           
            <Typography color="error" sx={{ textAlign: "center", minHeight: '25px' }}>
                {deletedAvatar ? "Avatar deleted succesfully" : ''}
            </Typography>            
        </Container>
    );
};

export default AvatarForm;
