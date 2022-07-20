import React from "react";
import { Box, Button, Modal } from "@mui/material";

import AddTaskForm from "./AddTaskForm";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '80%',
    maxWidth: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: '20px',
    boxShadow: 24,
    p: 2,
};

export default function AddTaskModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" sx={{ m: 2 }} onClick={handleOpen}>
                {"Add new Task"}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"                
            >
                <Box sx={style}>
                    <AddTaskForm handleClose={handleClose} />
                </Box>
            </Modal>
        </>
    );
}
