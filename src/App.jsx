import { useState } from "react";
import {
	useRequestAddNewTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestToogleTodoCompletion,
} from "./hooks";
import styles from "./App.module.css";
import sortImg from "./assets/sort.svg";
import debounce from "debounce";

function App() {
	const [inputText, setInputText] = useState("");
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [isSorted, setIsSorted] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos(searchText, isSorted);

	const { requestAddNewToDo, isCreating } =
		useRequestAddNewTodo(refreshTodos);

	const { requestDeleteToDo, isDeleting } = useRequestDeleteTodo();

	const { toggleTodoCompletion, isUpdating } =
		useRequestToogleTodoCompletion();

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<h1>ToDo</h1>
				<div className={styles.filter}>
					<input
						type="text"
						placeholder="Поиск..."
						className={styles.searchInput}
						// value={searchText}
						onChange={debounce(
							(e) => setSearchText(e.target.value),
							500
						)}
					/>
					<button
						className={`${styles.sortButton} ${
							isSorted ? styles.active : ""
						}`}
						onClick={() => setIsSorted((prev) => !prev)}
					>
						<img src={sortImg} alt="Sort" className={styles.sort} />
					</button>
				</div>
			</div>

			<form>
				<input
					type="text"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className={styles.inputNewTodo}
					placeholder="Напиши новую задачу..."
				/>
				<button
					onClick={() => requestAddNewToDo(inputText)}
					disabled={isLoading}
					className={styles.addButton}
				>
					Добавить
				</button>
			</form>
			<br />
			<div className={styles.todosList}>
				{isLoading || isCreating ? (
					<div className={styles.loader}></div>
				) : (
					Object.entries(todos).map(([id, { title, completed }]) => (
						<div key={id} className={styles.todoElement}>
							<div className={styles.checkboxContainer}>
								<input
									type="checkbox"
									className={styles.check}
									onChange={() =>
										toggleTodoCompletion(id, !completed)
									}
									checked={completed}
									id={id}
									disabled={isUpdating}
								/>
								<label htmlFor={id} className={styles.label}>
									<svg
										width="500"
										height="50"
										viewBox="0 0 500 50"
										className={styles.svg}
									>
										<rect
											x="15"
											y="20"
											width="25"
											height="25"
											stroke="black"
											fill="none"
											strokeOpacity=".5"
										/>
										<g transform="translate(0,-1002.3622)">
											<path
												d="M 15,1033 c 8,-7 20,1 28,-1 3,-1 6,-2 10,-2 9,0 16,1 24,5 4,1 32,1 36,0 3,-1 6,-2 9,-4 5,-2 20,0 27,0 11,0 22,-2 32,-2 28,0 55,4 81,-1 4,-1 11,0 14,2 2,1 6,-0 9,0 18,3 36,2 53,-2 11,-2 37,8 41,5 L 500,1033"
												stroke="#1b1b1b"
												fill="none"
												strokeWidth="5"
												className={styles.path2}
											/>
										</g>
									</svg>
								</label>
							</div>
							<span className={styles.taskText}>{title}</span>
							<button
								disabled={isDeleting}
								onClick={() => requestDeleteToDo(id)}
								className={styles.todoControl}
							>
								Удалить
							</button>
						</div>
					))
					// Object.entries(todos).map(([id, { title, completed }]) => (
					// 	<div key={id} className={styles.todoElement}>
					// 		<p className={styles.todoText}>{title}</p>
					// 		<input
					// 			type="checkbox"
					// 			checked={completed}
					// 			onChange={() => {
					// 				toggleTodoCompletion(id, !completed);
					// 			}}
					// 			disabled={isUpdating}
					// 			className={styles.todoControl}
					// 		/>
					// 		<button
					// 			disabled={isDeleting}
					// 			onClick={() => requestDeleteToDo(id)}
					// 			className={styles.todoControl}
					// 		>
					// 			Удалить
					// 		</button>
					// 	</div>
				)}
			</div>
		</div>
	);
}

export default App;
