import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Divider,
} from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import CloseIcon from "@mui/icons-material/Close";
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import { parseData } from "helpers/formTextData";
import CardTimeBlock from "./CardTimeBlock";
import CardTitleBlock from "./CardTitleBlock";

import "./card.scss";

export default function FullCard({
    props,
    handleDelete,
    handleComplete,
    handleUpdate,
    handleClose,
}) {
    const { title, subtitle, desc, date } = parseData(props);

    return (
        <Card
            variant="outlined"            
            sx={{
                width: 400,
                border: "2px solid #979797",
                maxWidth: '100%',
                borderRadius: "20px",
            }}
        >
            <CardContent>
                <CloseIcon className="modal_close" onClick={handleClose} />
                <CardTitleBlock
                    title={title}
                    date={date}
                    completed={props.completed}
                />
                <Box sx={{ display: "flex" }}>
                    <SubtitlesOutlinedIcon sx={{ mr: 1 }}/>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ minHeight: "30px", wordWrap: "break-word" }}
                        // gutterBottom
                    >
                        {subtitle}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex" }}>
                    <SubjectIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="body2"
                        sx={{ minHeight: "60px", wordWrap: "break-word" }}
                    >
                        {desc}
                    </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <CardTimeBlock created={props.createdAt} date={date} />
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
