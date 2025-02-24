import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBook() {
	const [title, setTitle]   = useState('');
	const [author, setAuthor] = useState('');
	const [date, setDate]     = useState('');
	const [price, setPrice]   = useState('');
	const navigate            = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		axios.post('http://localhost:8000/books', {title, author, date, price})
		.then(res => {
			console.log(res);
			navigate('/');
		})
		.catch(err => console.log(err));
	}

	return (
		<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
			<div className='w-50 bg-white rounded p-3'>
				<form onSubmit={handleSubmit}>
					<h2>Add Book</h2>
					<div className='mb-2'>
						<label htmlFor="">Title</label>
						<input type="text" placeholder='Enter title' className='form-control' onChange={e => setTitle(e.target.value)}></input>
					</div>
					<div className='mb-2'>
						<label htmlFor="">Author</label>
						<input type="text" placeholder='Enter Author' className='form-control' onChange={e => setAuthor(e.target.value)}></input>
					</div>
					<div className='mb-2'>
						<label htmlFor="">Published Date</label>
						<input type="date" className='form-control' onChange={e => setDate(e.target.value)}></input>
					</div>
					<div className='mb-2'>
						<label htmlFor="">Price</label>
						<input type="number" className='form-control' onChange={e => setPrice(e.target.value)}></input>
					</div>
					<button className='btn btn-success'>Save</button>
				</form>
			</div>
		</div>
	)
}

export default CreateBook;