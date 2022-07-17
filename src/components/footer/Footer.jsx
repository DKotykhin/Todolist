import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import './footer.scss';

const Footer = () => {
    return (
        <Box className="footer">
            <AssignmentTurnedInIcon className="icon" />
            <Typography className="logo_text">
                TodoList
            </Typography>
        </Box>
    )
}

export default Footer;