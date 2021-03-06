import React from "react";
import {API} from "../config";

const ShowImage = ({item, url}) => (
	<div className="product-img">
		<img 
			src={`${API}/${url}/photo/${item._id}`} 
			alt={item.name} 
			className="mb-2" 
			style={{
				height: "auto",
				maxHeight: "720px",
				width: "auto", 
				maxWidth: "720px"		 
			}}
		/>
	</div>
);

export default ShowImage;