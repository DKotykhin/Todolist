import React from "react";
import { Box, Button, Modal } from "@mui/material";

import AddTaskForm from "./AddTaskForm";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ModalAdd() {
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddTaskForm handleClose={handleClose} />
                </Box>
            </Modal>
        </>
    );
}
