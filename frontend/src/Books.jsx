import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8000/books')
		.then(res => setBooks(res.data))
		.catch(err => console.log(err));
	}, []);

	const handleDelete = async(id) => {
		try {
			await axios.delete(`http://localhost:8000/books/${id}`)
			window.location.reload();
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
			<div className='w-50 bg-white rounded p-3'>
				<Link to="/create" className='btn btn-success'> Add + </Link>
				<table className='table'>
				    <thead>
				        <tr>
					    	<th>Title</th>
					    	<th>Author</th>
					    	<th>Published Date</th>
					    	<th>Price</th>
					    	<th>Action</th>
					    </tr>
				    </thead>
				    <tbody>
					    {
					    	books.map((data, i) => {
					    		let formattedDate

					    		if (data.published_date != "") {
							      	// Format date
									const date = new Date(data.published_date);
									const year = date.getFullYear();
									const month = String(date.getMonth() + 1).padStart(2, '0');
									const day = String(date.getDate()).padStart(2, '0');
									formattedDate = `${year}-${month}-${day}`;
								} else {
									formattedDate = '';
								}

								return (
									<tr key={i}>
										<td>{data.title}</td>
										<td>{data.author}</td>
										<td>{formattedDate}</td>
										<td>{data.price}</td>
										<td>
											<Link to={`/update/${data.id}`} className='btn btn-warning'>Update</Link>
											&nbsp;
											<button className='btn btn-danger' onClick={e => handleDelete(data.id)}>Delete</button>
										</td>
									</tr>
								)
					    	})
					    }
				    </tbody>
				</table>
			</div>
		</div>
	)
}

export default Books;

