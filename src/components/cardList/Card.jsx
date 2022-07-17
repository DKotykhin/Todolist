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
        •
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

    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 350,
                border: "2px solid #979797",
                boxShadow: 24,
            }}
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
                <Typography variant="body2" color="text.secondary">
                    {"Updated: "}
                    {new Date(`${props.updatedAt}`).toDateString()}
                </Typography>
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
