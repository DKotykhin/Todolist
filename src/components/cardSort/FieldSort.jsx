import { useState } from "react";
import { Stack, Chip } from "@mui/material";

const sortItems = ["created", "deadline", "title"];

const FieldSort = ({ onSelect }) => {
    const [chipLabel, setChipLabel] = useState("created");

    const handleSelect = (label) => {
        setChipLabel(label);
        onSelect(label);
    };

    return (
        <Stack
            direction="row"
            spacing={3}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                mt: 2,
                justifyContent: "center",
            }}
        >
            {sortItems.map((item) => (
                <Chip
                    key={item}
                    sx={{ mb: 2 }}
                    variant="filled"
                    color={item === chipLabel ? "primary" : "default"}
                    label={item}
                    onClick={() => handleSelect(item)}
                />
            ))}
        </Stack>
    );
};

export default FieldSort;
