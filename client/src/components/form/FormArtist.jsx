import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiHandler from './../../api/APIHandler';

// custom tools
// import LabPreview from '../LabPreview';
// styles
import './../../styles/form.css';

const FormArtist = ({ mode, _id }) => {
  // console.log('mode :>> ', mode);
  // console.log('_id :>> ', _id);
  // creating states for the form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('');
  const [isBand, setIsBand] = useState(false);
  const [stylesDb, setStylesDb] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    apiHandler.get('/styles').then((apiRes) => {
      setStylesDb(apiRes.data.styles);
    });
  }, []);

  useEffect(() => {
    if (_id) {
      apiHandler.get(`/artists/${_id}`).then((apiRes) => {
        // console.log('getArtist: apiRes :>> ', apiRes);
        // set the artist's states to display existing values in all fields
        setName(apiRes.data.name);
        setDescription(apiRes.data.description);
        setStyle(apiRes.data.style);
        setIsBand(apiRes.data.isBand);
      });
    }
  }, [_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // feed the artist object based on form's values
    const artist = {
      name: name,
      description: description,
      style: style,
      isBand: Boolean(isBand),
    };
    // console.log('artist :>> ', artist);

    // then choosing the right route depending on mode
    if (mode === 'create') {
      // adding a new artist in db (server route)
      apiHandler.post('/artists', artist).then((apiRes) => {
        // console.log('apiRes :>> ', apiRes);
        // redirect to the list of artists (client route)
        navigate('/admin/artists');
      });
    } else {
      // updating a known artist in db (server route)
      apiHandler.patch(`/artists/${_id}`, artist).then((apiRes) => {
        // console.log('apiRes :>> ', apiRes);
        // redirect to the list of artists (client route)
        navigate('/admin/artists');
      });
    }
  };

  console.log('is band ?', isBand);

  return (
    <>
      {/* <h1 className="title diy">D.I.Y (FormArtist)</h1>
			<p>Code a form to Create/Update artists.</p>
			<LabPreview name="artistForm" isSmall />
			<hr /> */}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="label">name</label>
          <input className="input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="label">description</label>
          <input className="input"
            type="textarea"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="style" className="label">style</label>
          <select
            name="style"
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            {stylesDb &&
              stylesDb.map((styleDb) => {
                return (
                  <option key={styleDb._id} value={styleDb._id}>
                    {styleDb.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <p className="label">is band?</p>
          <div>
            <label htmlFor="isBand">yes</label>
            <input
              type="radio"
              id="isBand"
              name="isBand"
              checked={isBand === true}
              onChange={(e) => setIsBand(e.target.checked && true)}
            />
            <label htmlFor="isNotBand">no</label>
            <input
              type="radio"
              id="isNotBand"
              name="isBand"
              checked={isBand === false}
              onChange={(e) => {
                setIsBand(e.target.checked && false);
              }}
            />
          </div>
        </div>

        <button className="btn">OK</button>
      </form>
    </>
  );
};

export default FormArtist;
