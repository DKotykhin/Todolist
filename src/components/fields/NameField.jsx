import React from "react";
import { Controller } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

const NameField = ({ error, control }) => {
    return (
        <Box>
            <FormControl>
                <InputLabel>name</InputLabel>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder="type name..."
                            autoComplete="name"
                            error={error ? true : false}
                        />
                    )}
                />
            </FormControl>
            <FormHelperText>{error?.message}</FormHelperText>
        </Box>
    );
};

export default NameField;
