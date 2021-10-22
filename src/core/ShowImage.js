import React from "react";
import {API} from "../config";

const ShowImage = ({item, url}) => (
	<div className="product-img">
		<img 
			src={`${API}/${url}/photo/${item._id}`} 
			alt={item.name} 
			className="mb-2" 
			style={{
				height: "100%",
				maxHeight: "100%",
				width: "28vw", 
				maxWidth: "100%", 
				objectFit: "cover"				 
			}}
		/>
	</div>
);

export default ShowImage;