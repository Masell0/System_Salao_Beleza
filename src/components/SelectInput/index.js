import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectInput({ label, optionsArray, value, handleChange }) {

	const handleChangeSelect = (event) => {
		handleChange(event.target.value);
	};

	return (
		<FormControl size="small" className="mb-3 w-100">
			<InputLabel id="demo-select-small-label">{label}</InputLabel>
			<Select labelId="demo-select-small-label" id="demo-select-small" value={value} label={label} onChange={handleChangeSelect}>
				<MenuItem value={null}>
					<em>None</em>
				</MenuItem>
				{optionsArray.map((item, index) => (
					<MenuItem key={index} value={item.value}>
						{item.text}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default SelectInput;
