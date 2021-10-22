import React, { useState, useEffect } from "react";


const Checkbox = ({categories, handleFilters}) => {

	// state
	const [checked, setChecked] = useState([]);

	// change state
	const handleToggle = c => () => {
		// return the first index at which given element is found in array
		// -1 not found
		const currentCategoryId = checked.indexOf(c);
		const newCheckedCategoryId = [...checked];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if(currentCategoryId === -1) {
			newCheckedCategoryId.push(c);
		} else {
			newCheckedCategoryId.splice(currentCategoryId, 1);
		}
		// console.log(newCheckedCategoryId);
		setChecked(newCheckedCategoryId);
		handleFilters(newCheckedCategoryId);
	};


	return categories.map((c, i) => (
		<div key={i}>
			<input 
				onChange={handleToggle(c._id)} 
				value={checked.indexOf(c._id) !== -1} 
				type="checkbox" 
				className="form-check-input"/>
			<label className="form-check-label">&nbsp; {c.name}</label>
		</div>
	));
};

export default Checkbox;