import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const CardTimeBlock = ({ created, date }) => {
    const msLeft = Date.parse(date) - Date.parse(new Date());
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24)) + 1;

    return (
        <Box sx={{ display: "flex" }}>
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Box>
                <Typography variant="body2" color="text.secondary">
                    {"Created: "}
                    {new Date(created).toLocaleString()}
                </Typography>
                {date && (
                    <Typography variant="body2" color="text.secondary">
                        {"Deadline: "}
                        {new Date(date).toLocaleDateString()} &rarr;
                        {` Left: ${daysLeft} days`}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CardTimeBlock;
