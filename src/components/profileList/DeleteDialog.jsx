import { useState } from "react";

import { Button, Box, Divider } from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";

export default function DeleteDialog(props) {
    const { button, title, deleteButton } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        deleteButton();
    };

    return (
        <Box sx={{ textAlign: "center", mt: 2, mb: "100px" }}>
            <Button color="error" variant="outlined" onClick={handleOpen}>
                {button}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ border: "2px solid #ff0000" }}>
                    <DialogTitle sx={{ fontSize: "18px", my: 2 }}>
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can't cancel this action
                        </DialogContentText>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions sx={{ mx: 2 }}>
                        <Button
                            sx={{ color: "#808080" }}
                            onClick={handleClose}
                            autoFocus
                        >
                            Cancel
                        </Button>
                        <Button color="error" onClick={handleDelete}>
                            {button}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}
