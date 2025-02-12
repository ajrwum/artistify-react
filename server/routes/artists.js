/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");

const getAverageRate = async idArtist => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
};

router.get("/artists", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit artists ? > ", sortQ, limitQ);
  artistModel
    .find({})
    .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async artists => {
      const artistsWithRatesAVG = await Promise.all(
        artists.map(async res => {
          // AVG : things are getting tricky here ! :) 
          // the following map is async, updating each artist with an avg rate
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          // copy.avg = await getAverageRate(res._id); // get the average rates fr this artist

          copy.isFavorite =
            req.user && req.user.favorites.artists.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithRatesAVG }); // send the augmented result back to client
    })
    .catch(next);
});

// get an artist from db
router.get("/artists/:id", (req, res, next) => {
  console.log('req.params.id', req.params.id);
  artistModel
  .findById(req.params.id)
  .then(async artist => {
    // console.log('artist', artist);
    res.status(200).json(artist); // send the augmented result back to client
  })
  .catch(next);
});

router.get("/filtered-artists", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

// create a new artist in db
router.post("/artists", (req, res, next) => {
  const newArtist = req.body;
  console.log('newArtist', newArtist);
  artistModel
    .create(newArtist)
    .then(createdArtist => {
      // console.log('createdArtist', createdArtist);
      res.status(201).json(createdArtist)
    })
    .catch(next);
});

// update an existing artist
router.patch("/artists/:id", async (req, res, next) => {
  const toUpdateArtist = req.body;
  console.log('toUpdateArtist', toUpdateArtist);
  console.log('req.params.id', req.params.id);
  artistModel
    .findByIdAndUpdate(req.params.id, toUpdateArtist, { new: true })
    .then(updatedArtist => {
      // console.log('updatedArtist', updatedArtist);
      res.status(204).json(updatedArtist)
    })
    .catch(next);
});

router.delete("/artists/:id", (req, res, next) => {
  artistModel
  .findByIdAndDelete(req.params.id)
  .then(dbRes => res.status(200).json(dbRes))
  .catch(next);
});

module.exports = router;
