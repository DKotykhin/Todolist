import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";

import UpdateTaskForm from "components/taskForms/UpdateTaskForm";

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

export default function UpdateTaskModal({props, openModal, closeModal}) {
    const [open, setOpen] = useState(false);
    const [cardData, setCardData] = useState();
    // const handleOpen = () => setOpen(true);

    useEffect(() => {
        setOpen(openModal)
        setCardData(props)
    }, [openModal, props])

    const handleClose = () => {
        setOpen(false);
        closeModal()
    };

    return (
        <>            
            <Modal
                open={open}
                onClose={handleClose}                               
            >
                <Box sx={style}>
                    <UpdateTaskForm
                            props={cardData}
                            handleClose={handleClose}
                        />
                </Box>
            </Modal>
        </>
    );
}
