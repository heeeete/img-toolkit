import { fetchJson } from "../utils";

export const postTodo = async () => {
	const res = await fetchJson("/api/todo", {
		method: "POST",
		body: JSON.stringify({
			title: "test",
			content: "test",
		}),
	});

	const data = res;
	console.log(data);
};
