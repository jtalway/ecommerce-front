import React, { useState } from "react";


const RadioBox = ({prices, handleFilters}) => {
	const [value, setValue] = useState(0);

	const handleChange = (event) => {
		// get value from Shop RadioBox
		handleFilters(event.target.value);
		// update our state
		setValue(event.target.value);
	};

	return prices.map((p, i) => (
		<div key={i}>
			
			<input 
				onChange={handleChange} 
				value={`${p._id}`} 
				name = {p}
				type="radio" 
			/>
			<label className="form-check-label">&nbsp; {p.name}</label>
		</div>
	));
};

export default RadioBox;