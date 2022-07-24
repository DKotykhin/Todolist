import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";

import FullCard from "./FullCard";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: '90%',
    borderRadius: "20px",
    boxShadow: 24
};

export default function FullCardModal({
    props,
    openModal,
    closeModal,
    handleComplete,
    handleUpdate,
    handleDelete
}) {
    const [open, setOpen] = useState(false);
    const [cardData, setCardData] = useState();

    useEffect(() => {
        setOpen(openModal);
        setCardData(props);
    }, [openModal, props]);

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <FullCard
                        props={cardData}
                        handleClose={handleClose}
                        handleComplete={handleComplete}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                </Box>
            </Modal>
        </>
    );
}
