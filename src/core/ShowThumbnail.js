import React from "react";
import {API} from "../config";

const ShowThumbnail = ({item, url}) => (
	<div className="product-img">
		<img 
			src={`${API}/${url}/photo/${item._id}`} 
			alt={item.name} 
			className="mb-2" 
			style={{
				height: "370px",
				width: "370px", 
				maxWidth: "100%", 
				objectFit: "cover"				 
			}}
		/>
	</div>
);

export default ShowThumbnail;