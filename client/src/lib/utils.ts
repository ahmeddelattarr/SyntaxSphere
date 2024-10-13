import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fetchWithToken = (
	link: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body: unknown = undefined
) => {
	const token = localStorage.getItem("access");
	const response = fetch(`http://localhost:8000/${link}`, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	return response;
};

export const fetchTokenWithAccess = () => {
	const refresh = localStorage.getItem("refresh");
	const response = fetch(`http://localhost:8000/token/refresh/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refresh: refresh }),
	});
	return response;
};
