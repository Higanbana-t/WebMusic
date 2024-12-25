const { Op } = require('sequelize');
const { User, Artist, Album, Song } = require('../models/index');

const search = async (req, res) => {
  const { query } = req.query;

  try {
    const songs = await Song.findAll({
      where: {
        name: { [Op.like]: `%${query}%` }
      }
    });

    const artists = await Artist.findAll({
      where: {
        name: { [Op.like]: `%${query}%` }
      }
    });

    res.json({ songs, artists });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { search };
