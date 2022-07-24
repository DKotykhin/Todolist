import { Box, Typography } from "@mui/material";

const bull = (
    <Box component="span" sx={{ display: "inline", mx: "3px" }}>
        &bull;
    </Box>
);

const CardTitleBlock = ({ block, title, date, completed }) => {
    const msLeft = Date.parse(date) - Date.parse(new Date());
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24)) + 1;

    return (
        <Typography
            variant="h5"
            width={ block === 'short' ? null : 300}
            gutterBottom
            sx={[
                completed
                    ? { backgroundColor: "rgb(0, 161, 182, 0.5)" }
                    : daysLeft < 2 && daysLeft >= 0
                    ? { backgroundColor: "rgb(255, 165, 0, 0.5)" }
                    : daysLeft < 0
                    ? { backgroundColor: "rgb(255, 0, 0, 0.5)" }
                    : null,
                { borderRadius: "15px", wordWrap: "break-word" },
            ]}
        >
            {bull}
            {title}
            {bull}
        </Typography>
    );
};

export default CardTitleBlock;
