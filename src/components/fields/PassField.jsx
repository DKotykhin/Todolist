import { useState } from "react";
import { Controller } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    InputAdornment,
    IconButton,
    FormControl,
    FormHelperText,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PassField = (props) => {
    const { name, error, control } = props;
    const [showPass, setShowPass] = useState(false);

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box>
            <FormControl sx={{ width: "300px" }}>
                <InputLabel>
                    {name === "confirmpassword" ? "confirm password" : name}
                </InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="type password..."
                            type={showPass ? "text" : "password"}
                            error={error ? true : false}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPass ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )}
                />
            </FormControl>
            <FormHelperText>{error?.message}</FormHelperText>
        </Box>
    );
};

export default PassField;
