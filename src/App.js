import './app.module.css';
import { ToDoList } from './ToDoList';
import styles from './app.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<ToDoList />
			<header></header>
			<footer>
				<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</footer>
		</div>
	);
};
