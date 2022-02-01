import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import APIHandler from '../../api/APIHandler';

// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

const FormAlbum = ({ mode, _id }) => {
	const [album, setAlbum] = useState({
		title: "",
		artist: "",
		label: "",
		releaseDate: "",
		cover: "",
		description: ""
	});
	const coverRef = useRef();
	
	const [artistsDb, setArtistsDb] = useState([]);
	const [labelsDb, setLabelsDb] = useState([]);
	
	const navigate = useNavigate();

	// loading what's necessary to feed the select input
	useEffect(() => {
		// getting artists from db
		APIHandler.get('/artists').then((apiRes) => {
      setArtistsDb(apiRes.data.artists);
    });
		// getting labels from db
		APIHandler.get('/labels').then((apiRes) => {
      setLabelsDb(apiRes.data.labels);
    });
	}, []);

	// loading the selected album when necessary
	useEffect(() => {
		// getting artists from db
		if (_id) {
			APIHandler.get(`/albums/${_id}`).then((apiRes) => {
				console.log('apiRes :>> ', apiRes);
      	setAlbum({
					...apiRes.data,
					releaseDate: apiRes.data.releaseDate.toString().slice(0, 10)});
			});
		}
	}, [_id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('album :>> ', album);
		console.log('ref :>> ',  coverRef.current);

		// creating a FormData to handle the file upload
		const fd = new FormData();
		fd.append("title", album.title);
		fd.append("artist", album.artist);
		fd.append("label", album.label);
		fd.append("releaseDate", album.releaseDate);
		fd.append("cover", coverRef.current.files[0]);
		fd.append("description", album.description);
		// for (let data of fd.entries()) {
		// 	console.log(data)
		// }

			// then choosing the right route depending on mode
			if (mode === 'create') {
				// adding a new artist in db (server route)
				APIHandler.post('/albums', album).then((apiRes) => {
					// console.log('apiRes :>> ', apiRes);
					// redirect to the list of albums (client route)
					navigate('/admin/albums');
				});
			} else {
				// updating a known album in db (server route)
				APIHandler.patch(`/albums/${_id}`, album).then((apiRes) => {
					// console.log('apiRes :>> ', apiRes);
					// redirect to the list of albums (client route)
					navigate('/admin/albums');
				});
			}
	};

	return (
		<>
			<h1 className="title diy">D.I.Y (FormAlbum)</h1>
			<p>Code a form to Create/Update albums.</p>
			{/* <LabPreview name="albumForm" isSmall /> */}
			<form className="form" onSubmit={handleSubmit} >
				<div>
					<label htmlFor="title" className="label" >title</label>
					<input type="text" name="title" id="title" className="input"
									value={album.title}
									onChange={e => setAlbum({...album, title: e.target.value})} />
				</div>
				<div>
					<label htmlFor="artist" className='label' >artist</label>
					<select name="artist" id="artist" className='input'
									value={album.artist}
									onChange={e => setAlbum({...album, artist: e.target.value})} >
						{
							artistsDb && artistsDb.map(artistDb => {
								return <option key={artistDb._id} value={artistDb._id} >{artistDb.name}</option>
							})
						}
					</select>
				</div>
				<div>
					<label htmlFor="label" className='label' >label</label>
					<select name="label" id="label" className='input'
									value={album.label}
									onChange={e => setAlbum({...album, label: e.target.value})} >
						{
							labelsDb && labelsDb.map(labelDb => {
								return <option key={labelDb._id} value={labelDb._id} >{labelDb.name}</option>
							})
						}
					</select>
				</div>
				<div>
					<label htmlFor="releaseDate" className='label' >release date</label>
					<input type="date" name="releaseDate" id="releaseDate" className='input'
									placeholder="dd/mm/yyyy"
									value={album.releaseDate}
									onChange={e => setAlbum({...album, releaseDate: e.target.value})} />
				</div>
				<div>
					<label htmlFor="cover" className='label' >cover</label>
					<input type="file" name="cover" id="cover" ref={coverRef} className='icon' />
				</div>
				<div>
					<label htmlFor="description" className="label" >description</label>
					<input type="textarea" name="description" id="description" className="input"
									rows="4"
									value={album.description}
									onChange={e => setAlbum({...album, description: e.target.value})} />
				</div>
				<button className="btn">OK</button>
			</form>
		</>
	);
};

export default FormAlbum;
