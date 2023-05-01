/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useRef } from 'react';
import './App.css';
import Trash from './components/Trash';
import Recipe from './components/Recipe';

function App() {
	const [recipes, setRecipes] = useState([]);
	const [currentRecipe, setCurrentRecipe] = useState();
	const [currentState, setCurrentState] = useState('list');
	const [currentIdx, setCurrentIdx] = useState(null);
	const [favorited, setFavorited] = useState([]);
	const addNameInput = useRef();
	const addIngredientsInput = useRef();
	const editNameInput = useRef();
	const editIngredientsInput = useRef();

	const addRecipe = () => {
		//console.log(addInput.current.value);
		if (addNameInput.current.value !== '') {
			setRecipes((prevState) => [
				...prevState,
				{
					id: addNameInput.current.value,
					name: addNameInput.current.value,
					ingredients: addIngredientsInput.current.value,
				},
			]);
		}
	};
	const addFavorite = (idx) => {
		setFavorited((prevState) => [...prevState, recipes[idx]]);
	};
	const editRecipe = () => {
		const newRecipe = {
			id: currentRecipe.id,
			name: editNameInput.current.value,
			ingredients: editIngredientsInput.current.value,
		};
		const newArr = recipes.map((recipe, i) => {
			if (i === currentIdx) {
				return newRecipe;
			} else return recipe;
		});
		setRecipes(newArr);
		setCurrentState('list');
	};
	const addIngredient = (value) => {
		const arrCopy = currentRecipe;
		arrCopy.ingredients = [...arrCopy.ingredients, value];
		setCurrentRecipe(arrCopy);
	};
	const deleteRecipe = (idx) => {
		const newArr = recipes.filter((recipe, i) => i !== idx);

		setRecipes([...newArr]);
	};
	const handleRecipe = (idx) => {
		setCurrentIdx(idx);
		setCurrentRecipe(recipes[idx]);
		setCurrentState('recipe');
	};
	console.log('test', currentRecipe);
	let content;

	if (currentState === 'list') {
		content = (
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
							placeholder='Recipe Name...'
							className='my-auto input input-bordered w-full max-w-xs'
						/>
						<input
							ref={addIngredientsInput}
							type='text'
							placeholder='Ingredients'
							className='my-auto input input-bordered w-full max-w-xs'
						/>
						<div className='my-auto ml-2 modal-action'>
							<label
								onClick={addRecipe}
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
				<div className='hero min-h-screen bg-base-200'>
					<div className='hero-content text-center'>
						<h1 className='text-5xl'>React Recipe App</h1>
						<div className='card w-96 bg-base-100 shadow-xl'>
							<div className='card-body items-center text-center'>
								<label
									className='btn btn-primary'
									htmlFor='my-modal'
								>
									Add Recipe
								</label>
								<ul className='menu w-full'>
									{recipes.length > 0
										? recipes.map((recipe, i) => {
												return (
													<li
														key={i}
														className='w-full mb-2 flex flex-row'
													>
														<a
															onClick={() => handleRecipe(i)}
															className='w-4/6 rounded-md'
														>
															{recipe.name}
														</a>
														<button
															onClick={() => deleteRecipe(i)}
															className='w-1/6 btn btn-primary rounded-md'
														>
															<Trash />
														</button>
														<button
															onClick={() => addFavorite(i)}
															className='w-1/6 btn btn-primary rounded-md'
														>
															Fav
														</button>
													</li>
												);
										  })
										: ''}
								</ul>
								<h2 className='text-2xl text-white'>Favorites</h2>
								<ul className='menu w-full'>
									{favorited.length > 0
										? favorited.map((recipe, i) => {
												return (
													<li key={i}>
														<a onClick={() => handleRecipe(i)}>{recipe.name}</a>
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
	} else if (currentState === 'recipe') {
		content = (
			<div>
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
							placeholder='Recipe Name...'
							className='my-auto input input-bordered w-full max-w-xs'
						/>
						<input
							ref={editIngredientsInput}
							type='text'
							placeholder='Ingredients'
							className='my-auto input input-bordered w-full max-w-xs'
						/>
						<div className='my-auto ml-2 modal-action'>
							<label
								onClick={editRecipe}
								htmlFor='my-modal2'
								className='btn'
							>
								Save
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
				<Recipe
					currentRecipe={currentRecipe}
					addIngredient={addIngredient}
					setCurrentState={setCurrentState}
				/>
			</div>
		);
	}
	return <div>{content}</div>;
}

export default App;
