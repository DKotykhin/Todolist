import React from "react";
import { Controller } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

const EmailField = ({ error, control }) => {
    return (
        <Box>
            <FormControl>
                <InputLabel>email</InputLabel>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            placeholder="type email..."
                            autoComplete="email"
                            error={error ? true : false}
                        />
                    )}
                />
            </FormControl>
            <FormHelperText>{error?.message}</FormHelperText>
        </Box>
    );
};

export default EmailField;
