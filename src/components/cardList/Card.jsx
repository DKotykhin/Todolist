import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Divider,
} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        &bull;
    </Box>
);

export default function BasicCard({
    props,
    handleDelete,
    handleComplete,
    handleUpdate,
}) {
    const title = props.description.split("&#9000;")[0];
    const subtitle = props.description.split("&#9000;")[1];
    const desc = props.description.split("&#9000;")[2];
    const date = props.description.split("&#9000;")[3];

    const msLeft = Date.parse(date) - Date.parse(new Date());
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24)) + 1;

    return (
        <Card
            variant="outlined"
            sx={[
                props.completed
                    ? { backgroundColor: "rgb(0, 161, 182, 0.2)" }
                    : daysLeft < 2
                    ? { backgroundColor: "rgb(255, 0, 0, 0.15)" }
                    : null,
                {
                    width: 380,
                    border: "2px solid #979797",
                    boxShadow: 24,
                    borderRadius: "20px",
                },
            ]}
        >
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {bull}
                    {title}
                    {bull}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ minHeight: "28px" }}
                    // gutterBottom
                >
                    {subtitle}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ minHeight: "60px" }}>
                    {desc}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    {"Created: "}
                    {new Date(`${props.createdAt}`).toDateString()}
                </Typography>                
                {date && (
                    <Typography variant="body2" color="text.secondary">
                        {"Deadline: "}
                        {new Date(date).toDateString()}{' '}&rarr;
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
