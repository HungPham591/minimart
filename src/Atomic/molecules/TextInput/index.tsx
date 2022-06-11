import { Controller } from "react-hook-form";
import React from "react";
import { TextField } from "@mui/material";

function CustomTextInput(props: any) {
    const { name, control, label, errors } = props;
    const errorMessage = errors ? errors[name]?.message : "";
    const error = errors ? errors[name] : "";
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField
                    {...props}
                    onChange={onChange}
                    value={value}
                    label={label}
                    fullWidth
                    variant="outlined"
                    helperText={errorMessage}
                    error={!!error}
                />
            )}
        />
    );
};

export default React.memo(CustomTextInput);