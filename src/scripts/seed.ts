import mongoose from "mongoose";
import { Profile } from "../models/Profile";
import { Simulator } from "../models/Simulator";
import { Favorite } from "../models/Favorite";
import { DBURL } from "../config";

(async () => {

  mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const profile = new Profile({
    name: 'Sasuke Uchiha',
    nickname: 'sasuke',
    email: 'info@sasuke.test',
    capital: 123,
    divisa: 'sample divisa',
    prefered_cryptocurrency: 'BTC',
  });
  await profile.save();

  const idProfile = profile._id;

  const simulator = new Simulator({
    profile_id: idProfile,
    date_recorded: '01/05/2021',
    cryptocurrency: 'BTC',
    euros: 118260,
    price: 59130,
    quantity: 2,
  });
  await simulator.save();

  const favorite = new Favorite({
    profile_id: idProfile,
    name: 'My Favorites',
    favorites: [
      'favorite1',
      'favorite2',
      'favorite3',
    ]
  });
  await favorite.save();

  mongoose.disconnect();
})();
