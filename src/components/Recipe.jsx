/* eslint-disable react/prop-types */
const Recipe = ({ currentRecipe, setCurrentState }) => {
	return (
		<div>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content text-center'>
					<div className='card w-96 bg-base-100 shadow-xl'>
						<div className='card-body items-center text-center'>
							<h2 className='card-title'>{currentRecipe.name}</h2>
							<p>{currentRecipe.ingredients}</p>
							<div className='card-actions'>
								<label
									htmlFor='my-modal2'
									className='btn btn-primary'
								>
									Edit Recipe
								</label>
								<button
									onClick={() => setCurrentState('list')}
									className='btn btn-primary'
								>
									Go Back
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Recipe;
