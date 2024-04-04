import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodos = (searchText, isSorted) => {
	const [isLoading, setIsLoading] = useState(false);
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const todoDbRef = ref(db, 'todos');
		setIsLoading(true);

		return onValue(todoDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];
			let result = {};
			let sortedTodos = {};
			if (searchText !== '') {
				result = Object.fromEntries(
					Object.entries(loadedTodos).filter(([, todo]) =>
						todo.title.toLowerCase().includes(searchText.toLowerCase()),
					),
				);
			} else {
				result = loadedTodos;
			}
			if (isSorted) {
				sortedTodos = Object.fromEntries(
					Object.entries(result).toSorted(([, todoA], [, todoB]) => todoA.title.localeCompare(todoB.title)),
				);
				result = sortedTodos;
			}

			setTodos(result);
			setIsLoading(false);
		});
	}, [searchText, isSorted]);
	return {
		isLoading,
		todos,
	};
};
