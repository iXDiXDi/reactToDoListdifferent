import { useEffect, useState } from 'react';
import styles from './app.module.css';

export const ToDoList = () => {
	const [toDoListState, setToDoListState] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const [refreshToDo, setRefreshToDo] = useState(false);

	const rerenderToDo = () => setRefreshToDo(!refreshToDo);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/toDo')
			.then((loadedData) => loadedData.json())
			.then((json) => setToDoListState(json))
			.finally(() => setIsLoading(false));
	}, [refreshToDo]);

	const requestAddToDo = () => {
		setIsAdding(true);

		fetch('http://localhost:3005/toDo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Lesson',
				description: 'Simple lesson for 1st time',
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('ToDo created, server response: ', response);
				rerenderToDo();
			})
			.finally(() => setIsAdding(false));
	};
	const requestEditToDo = () => {
		setIsUpdating(true);

		fetch('http://localhost:3005/toDo/4', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Lesson',
				description: `${new Date().getTime()}`,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('ToDo edited, server response: ', response);
				rerenderToDo();
			})
			.finally(() => setIsUpdating(false));
	};

	const requestDeleteToDo = () => {
		setIsDeleting(true);

		fetch('http://localhost:3005/toDo/5', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('ToDo deleted, server response: ', response);
				rerenderToDo();
			})
			.finally(() => setIsDeleting(false));
	};

	return (
		<>
			<p>Здесь могла бы быть ваша реклама :-)</p>
			<br></br>
			<p>'http://localhost:3005/toDo'</p>
			<div className={styles.app}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					toDoListState.map(({ id, name, description, completed }) => (
						<div key={id} className={styles.container}>
							<div className={styles.box_1}>{id}</div>
							<div className={styles.box_2}>{name}</div>
							<div className={styles.box_3}>{description}</div>
							<div className={styles.box_4}>
								{completed ? (
									<span className={styles.green}>true</span>
								) : (
									<span className={styles.red}>false</span>
								)}
							</div>
						</div>
					))
				)}
			</div>
			<button disabled={isAdding} onClick={requestAddToDo}>
				Добавить
			</button>
			<button disabled={isUpdating} onClick={requestEditToDo}>
				Обновить
			</button>
			<button disabled={isDeleting} onClick={requestDeleteToDo}>
				Удалить
			</button>
		</>
	);
};
