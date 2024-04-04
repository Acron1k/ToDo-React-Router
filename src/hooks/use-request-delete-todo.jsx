import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteToDo = (id) => {
		setIsDeleting(true);
		const todoDbRef = ref(db, `todos/${id}`);

		remove(todoDbRef)
			// try {
			// 	fetch(`http://localhost:3000/todos/${id}`, {
			// 		method: 'DELETE',
			// 	})
			// 		.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Задачка удалена. Ответ сервера: ${response}`);
			})

			.finally(() => setIsDeleting(false));
		// } catch (error) {
		// 	console.error('Ошибка при добавлении задачи:', error);
		// }
	};

	return {
		requestDeleteToDo,
		isDeleting,
	};
};
