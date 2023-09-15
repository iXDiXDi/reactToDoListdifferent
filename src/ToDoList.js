import { useEffect, useState } from 'react';
import styles from './app.module.css';

export const ToDoList = () => {
	const [toDoListState, setToDoListState] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos/')
			.then((loadedData) => loadedData.json())
			.then((json) => setToDoListState(json))
			.finally(() => setIsLoading(false));
	}, []);

	console.log('toDoListState', toDoListState);

	return (
		<>
			<p>Здесь могла бы быть ваша реклама :-)</p>
			<p>toDoListState</p>
			<div className={styles.app}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					toDoListState.map(({ id, userId, title, completed }) => (
						<div key={id} className={styles.wrapper}>
							<div className={styles.list}>
								<span>{id}</span>
								<span>{userId}</span>
								<span>{title}</span>
								<span>{completed ? 'False' : 'True'}</span>
							</div>
						</div>
					))
				)}
				<button>Добавить заметку</button>
			</div>
		</>
	);
};
