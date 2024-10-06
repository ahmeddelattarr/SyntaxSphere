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
