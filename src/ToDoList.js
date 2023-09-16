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

	return (
		<>
			<p>Здесь могла бы быть ваша реклама :-)</p>
			<br></br>
			<p>'https://jsonplaceholder.typicode.com/todos/'</p>
			<div className={styles.app}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					toDoListState.map(({ id, userId, title, completed }) => (
						<div key={id} className={styles.container}>
							<div className={styles.box_1}>{id}</div>
							<div className={styles.box_2}>{userId}</div>
							<div className={styles.box_3}>{title}</div>
							<div className={styles.box_4}>
								{completed ? (
									<span className={styles.red}>False</span>
								) : (
									<span className={styles.green}>True</span>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};
