import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBook() {
	const navigate        = useNavigate();
	const {id}            = useParams();

	const [book, setBook] = useState({
	    title: '',
	    author: '',
	    published_date: '',
	    price: ''
	});

	useEffect(() => {
	    axios
	      .get(`http://localhost:8000/books/${id}`)
	      .then((response) => {
	        setBook(response.data[0]);
	      })
	      .catch((err) => console.error('Error fetching book:', err));
	}, [id]);

	// Menangani perubahan input
  	const handleInputChange = (e) => {
	    const { name, value } = e.target;
	    setBook((prevBook) => ({
	      ...prevBook,
	      [name]: value
	    }));
	};

	function handleSubmit(e) {
		e.preventDefault();

		axios.put(`http://localhost:8000/books/${id}`, book)
      	.then((res) => {
        	console.log('Buku berhasil diperbarui');
        	navigate('/');
      	})
      	.catch((err) => console.error('Error updating book:', err));
	}

	return (
		<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
			<div className='w-50 bg-white rounded p-3'>
				<form onSubmit={handleSubmit}>
					<h2>Update Book</h2>
					<div className='mb-2'>
						<label htmlFor="">Title</label>
						<input type="text" name="title" placeholder='Enter title' className='form-control' value={book.title} onChange={handleInputChange}></input>
					</div>
					<div className='mb-2'>
						<label htmlFor="">Author</label>
						<input type="text" name="author" placeholder='Enter Author' className='form-control' value={book.author} onChange={handleInputChange}></input>
					</div>
					<div className='mb-2'>
						<label htmlFor="">Published Date</label>
						<input type="date" name="published_date" className='form-control' value={book.published_date} onChange={handleInputChange}></input>
					</div>
					<div className='mb-2'>
						<label htmlFor="">Price</label>
						<input type="number" name="price" className='form-control' value={book.price} onChange={handleInputChange}></input>
					</div>
					<button className='btn btn-success'>Update</button>
				</form>
			</div>
		</div>
	)
}

export default UpdateBook;