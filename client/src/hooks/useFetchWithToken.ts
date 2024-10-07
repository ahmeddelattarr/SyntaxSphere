import { useCallback, useEffect, useState } from "react";
import { fetchWithToken } from "../lib/utils";
import { useNavigate } from "react-router-dom";

const useFetchWithToken = <T>(
	link: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body: unknown = undefined
) => {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [triggerRefresh, setTriggerRefresh] = useState(false);

	const navigate = useNavigate();

	const fetchData = useCallback(async () => {
		setLoading(true);
		const response = await fetchWithToken(link, method, body);
		if (!response.ok) {
			if (response.status === 401) navigate("/");
			setLoading(false);
			setError(response.statusText);
			return;
		}
		const data:T = await response.json();
		setData(data);
		setLoading(false);
	}, [body, link, method, navigate]);

	useEffect(() => {
		fetchData();
	}, [fetchData, triggerRefresh]);

	const refresh = () => {
		setTriggerRefresh((prev) => !prev);
	};

	return {data, loading, error, refresh};
};

export default useFetchWithToken;
