import React from 'react';
import { Link } from 'react-router-dom';
// custom tools
import IconFav from '../icon/IconFavorite';
// styles
import './../../styles/icon-color.css';

export default function CardArtist({ data: album, cssItem }) {
  return (
    <>
      <Link to={`/albums/${album._id}`}>
        <p className="title">{album.title}</p>
        <img src={album.cover} alt={album.title} className="cover" />
      </Link>
      <IconFav
        // isAlreadyFavorite={isUserFavorite}
        resourceId={album._id}
        resourceType={'albums'}
      />
    </>
  );
}
