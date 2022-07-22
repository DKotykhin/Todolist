import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Divider,
} from "@mui/material";

import { parseData } from "helpers/formTextData";

const bull = (
    <Box component="span" sx={{ display: "inline", mx: "3px" }}>
        &bull;
    </Box>
);

export default function BasicCard({
    props,
    handleDelete,
    handleComplete,
    handleUpdate,
}) {
    const { title, subtitle, desc, date } = parseData(props);

    const msLeft = Date.parse(date) - Date.parse(new Date());
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24)) + 1;

    return (
        <Card
            variant="outlined"
            sx={{
                width: 380,
                border: "2px solid #979797",
                boxShadow: 24,
                borderRadius: "20px",
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={[
                        props.completed
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
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ minHeight: "28px", wordWrap: "break-word" }}
                    // gutterBottom
                >
                    {subtitle}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography
                    variant="body2"
                    sx={{ minHeight: "60px", wordWrap: "break-word" }}
                >
                    {desc}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    {"Created: "}
                    {new Date(`${props.createdAt}`).toLocaleString()}
                </Typography>
                {date && (
                    <Typography variant="body2" color="text.secondary">
                        {"Deadline: "}
                        {new Date(date).toLocaleDateString()} &rarr;
                        {` Left: ${daysLeft} days`}
                    </Typography>
                )}
            </CardContent>
            <CardActions
                sx={{ display: "flex", justifyContent: "space-around" }}
            >
                <Button size="small" color="error" onClick={handleDelete}>
                    Delete
                </Button>
                <Button size="small" color="inherit" onClick={handleUpdate}>
                    Update
                </Button>
                <Button size="small" onClick={handleComplete}>
                    {props.completed ? "Undo Complete" : "Complete"}
                </Button>
            </CardActions>
        </Card>
    );
}
