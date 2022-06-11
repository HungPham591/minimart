import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Controller } from "react-hook-form";


function CustomDropdown(props: any) {
	const { name, control, data, title } = props;
	const generateSelectOptions = () => {
		return data.map((option: any) => {
			return (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			);
		});
	};

	return (
		<FormControl fullWidth>
			<InputLabel style={{ backgroundColor: "white" }}>{title}</InputLabel>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Select onChange={onChange} value={value}>
						{generateSelectOptions()}
					</Select>
				)}
			/>
		</FormControl>
	)
}


export default React.memo(CustomDropdown);