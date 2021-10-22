import { API } from "../config";

// GET - Read the User information
export const read = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// PUT - Update User Profile
export const update = (userId, token, user) => {
	return fetch(`${API}/user/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};


// Update the User in LocalStorage
export const updateUser = (user, next) => {
	if (typeof window !== "undefined") {
		// do we have a user in localstorage?
		if (localStorage.getItem("jwt")) {
			// get from localstorage
			let auth = JSON.parse(localStorage.getItem("jwt"));
			// update information from profile (user)
			auth.user = user;
			// update localstorage
			localStorage.setItem("jwt", JSON.stringify(auth));
			next();
		}
	}
};

// GET - Read the User information
export const getPurchaseHistory = (userId, token) => {
	return fetch(`${API}/orders/by/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};




