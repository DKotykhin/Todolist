import { Controller } from "react-hook-form";

import { TextField } from "@mui/material";

const FormField = (props) => {
    const { name, control, error, maxRows, placeholder } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    className="field"
                    {...field}
                    error={error ? true : false}
                    helperText={error?.message}
                    multiline
                    maxRows={maxRows}
                    label={name}
                    variant="outlined"
                    type="text"
                    placeholder={placeholder}
                />
            )}
        />
    );
};

export default FormField;
