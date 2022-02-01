import React, { useState, useEffect } from 'react';

// custom tools
import apiHandler from '../api/APIHandler';
import CardArtist from '../components/card/CardArtist';
import List from '../components/List';
import LabPreview from '../components/LabPreview';
// styles
import '../styles/card.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.get('/artists').then((apiRes) => {
      console.log('apiRes :>> ', apiRes);
      setArtists(apiRes.data.artists);
    });
  }, []);

  return (
    <React.Fragment>
      {/* <h1 className="title diy">D.I.Y (Artists)</h1>
      <p>
        Fetch all artists from the database.
        <br />
        Display a card for each artist.
        <br />
        Provide a router {`<Link>`} to="artists/artists.id",
        <br />
        leading to separate component Artist (details) component.
        <br />
        If the artists list is empty, provide a default view.
      </p> */}
      <h1 className="title diy">D.I.Y (IconFavorite)</h1>
      <p>
        Import a custom {`<IconFavorite />`} on each artist card.
        <br />
        When clicked, send an axios.patch request to add the artist to the
        user's favorites.
      </p>
      <hr />
      {/* <LabPreview name="artists" /> */}

      <h1 className="title">All artists</h1>
      {artists.length ? (
        <List
          data={artists}
          Component={CardArtist}
          cssList="cards"
          cssItem="card artist"
        />
      ) : (
        <p>No artist yet! Please come back later...</p>
      )}
    </React.Fragment>
  );
};

export default Artists;
