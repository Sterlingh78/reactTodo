/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useRef } from 'react';
import './App.css';
import Trash from './components/Trash';

function App() {
	const [todos, setTodos] = useState([]);
	const [index, setIndex] = useState();
	const addNameInput = useRef();
	const editNameInput = useRef();

	const addTodo = () => {
		//console.log(addInput.current.value);
		if (addNameInput.current.value !== '') {
			setTodos((prevState) => [
				...prevState,
				{
					id: addNameInput.current.value,
					name: addNameInput.current.value,
					done: false,
				},
			]);
		}
	};
	const editTodo = () => {
		const newArr = todos.map((todo, i) => {
			if (i === index) {
				return {
					id: editNameInput.current.value,
					name: editNameInput.current.value,
					done: todo.done,
				};
			} else return todo;
		});
		setTodos(newArr);
	};
	const deleteTodo = (idx) => {
		const newArr = todos.filter((todo, i) => i !== idx);

		setTodos([...newArr]);
	};
	const markDone = (idx) => {
		const newArr = todos.map((todo, i) => {
			if (i === idx) {
				return {
					id: todo.id,
					name: todo.name,
					done: !todo.done,
				};
			} else return todo;
		});
		setTodos(newArr);
	};
	return (
		<div>
			<input
				type='checkbox'
				id='my-modal'
				className='modal-toggle'
			/>
			<div className='modal'>
				<div className='modal-box flex justify-center text-center'>
					<input
						ref={addNameInput}
						type='text'
						placeholder='Todo Name...'
						className='my-auto input input-bordered w-full max-w-xs'
					/>
					<div className='my-auto ml-2 modal-action'>
						<label
							onClick={addTodo}
							htmlFor='my-modal'
							className='btn'
						>
							Add
						</label>
						<label
							htmlFor='my-modal'
							className='btn'
						>
							Cancel
						</label>
					</div>
				</div>
			</div>
			<input
				type='checkbox'
				id='my-modal2'
				className='modal-toggle'
			/>
			<div className='modal'>
				<div className='modal-box flex justify-center text-center'>
					<input
						ref={editNameInput}
						type='text'
						placeholder='Todo Name...'
						className='my-auto input input-bordered w-full max-w-xs'
					/>
					<div className='my-auto ml-2 modal-action'>
						<label
							onClick={editTodo}
							htmlFor='my-modal2'
							className='btn'
						>
							Edit
						</label>
						<label
							htmlFor='my-modal2'
							className='btn'
						>
							Cancel
						</label>
					</div>
				</div>
			</div>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content text-center'>
					<div className='flex flex-col'>
						<h1 className='text-5xl mb-2'>React Todo App</h1>
						<p>Click on a todo to mark as done. </p>
					</div>
					<div className='card w-96 bg-base-100 shadow-xl'>
						<div className='card-body items-center text-center'>
							<label
								className='btn btn-primary'
								htmlFor='my-modal'
							>
								Add Todo
							</label>
							<ul className='menu w-full'>
								{todos.length > 0
									? todos.map((todo, i) => {
											return (
												<li
													key={i}
													className='w-full mb-2 flex flex-row'
												>
													<a
														onClick={() => markDone(i)}
														className={`w-4/6 rounded-md ${
															todo.done ? 'bg-base-300' : ''
														}`}
													>
														{todo.name}
													</a>
													<button
														onClick={() => deleteTodo(i)}
														className='w-1/6 btn btn-primary rounded-md'
													>
														<Trash />
													</button>
													<label
														htmlFor='my-modal2'
														onClick={() => setIndex(i)}
														className='w-1/6 btn btn-primary rounded-md'
													>
														Edit
													</label>
												</li>
											);
									  })
									: ''}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
