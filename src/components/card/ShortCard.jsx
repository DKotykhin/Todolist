import { Card, CardContent, Divider } from "@mui/material";

import { parseData } from "helpers/formTextData";
import CardTimeBlock from "./CardTimeBlock";
import CardTitleBlock from "./CardTitleBlock";

import "./card.scss";

export default function ShortCard({ props, handleOpen }) {
    const { title, date } = parseData(props);

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
            <CardContent onClick={handleOpen} sx={{ cursor: "pointer" }}>
                <CardTitleBlock
                    block={"short"}
                    title={title}
                    date={date}
                    completed={props.completed}
                />
                <Divider sx={{ mb: 1 }} />
                <CardTimeBlock created={props.createdAt} date={date} />
            </CardContent>
        </Card>
    );
}
