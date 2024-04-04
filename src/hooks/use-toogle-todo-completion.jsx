import { useState } from 'react';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';

export const useRequestToogleTodoCompletion = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const toggleTodoCompletion = (id, newData) => {
		setIsUpdating(true);
		const todoDbRef = ref(db, `todos/${id}`);

		update(todoDbRef, {
			completed: newData,
		})
			// try {
			// 	fetch(`http://localhost:3000/todos/${id}`, {
			// 		method: 'PATCH',
			// 		headers: { 'Content-Type': 'application/json;charset=utf-8' },
			// 		body: JSON.stringify({
			// 			completed: newData,
			// 		}),
			// 	})
			// 		.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Задачка изменена. Ответ сервера:`, response);
			})

			.finally(() => setIsUpdating(false));
		// } catch (error) {
		// 	console.error('Ошибка при обновлении задачи:', error);
		// }
	};

	return {
		toggleTodoCompletion,
		isUpdating,
	};
};
