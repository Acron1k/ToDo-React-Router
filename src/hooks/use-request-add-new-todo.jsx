import { useState } from "react";

export const useRequestAddNewTodo = (refreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);
	const requestAddNewToDo = (newTodo) => {
		setIsCreating(true);

		try {
			fetch("http://localhost:3000/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json;charset=utf-8" },
				body: JSON.stringify({
					title: newTodo,
					completed: false,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log(
						`Задачка добавлена. Ответ сервера: ${response}`
					);
					refreshTodos();
				})

				.finally(() => setIsCreating(false));
		} catch (error) {
			console.error("Ошибка при добавлении задачи:", error);
		}
	};

	return {
		requestAddNewToDo,
		isCreating,
	};
};
