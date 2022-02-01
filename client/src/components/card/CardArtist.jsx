import React from 'react';
import { Link } from 'react-router-dom';
// custom tools
import IconFav from '../icon/IconFavorite';
// styles
import './../../styles/icon-color.css';

export default function CardArtist({ data: artist, cssItem }) {
  console.log('artist :>> ', artist);
  // isUserFavorite = is artistId included in array user.favorites.artists
  // request to be done with axios to the server route "get /users/:id/favorites"

  return (
    <div className={cssItem}>
      <div
        className="color"
        style={{ backgroundColor: artist.style?.color }}
      ></div>
      <Link to={`/artists/${artist._id}`}>
        <p className="title">{artist.name}</p>
      </Link>
      <IconFav
        // isAlreadyFavorite={isUserFavorite}
        resourceId={artist._id}
        resourceType={'artists'}
      />
    </div>
  );
}
