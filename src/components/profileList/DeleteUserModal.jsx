import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./profilelist.scss";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function DeleteUserModal({ handleDelete }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box className="delete_user">
            <Button
                color="error"
                variant="contained"
                className="delete_button"
                onClick={handleOpen}                
            >
                {"Delete User"}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="delete_box">
                    <CloseIcon className="modal_close" onClick={handleClose} />
                    <Typography className="delete_title">
                        {"You really want to delete user?"}
                    </Typography>
                    <Button
                        color="error"
                        variant="contained"
                        className="delete_button_modal"
                        onClick={handleDelete}                        
                    >
                        {"Delete User"}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
