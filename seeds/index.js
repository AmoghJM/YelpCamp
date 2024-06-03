const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '663479967019e57c753ecd0b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, voluptate odio quia officia quidem provident quos molestiae, dolores sapiente expedita ut sequi esse aperiam ad porro quod, distinctio quas. Rerum?',
            price,
            geometry: {
                    type: "Point",
                    coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                    ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlrlgzxs1/image/upload/v1716398715/YelpCamp/kkt6dxikeg2hkvndjbve.avif',
                    filename: 'YelpCamp/kkt6dxikeg2hkvndjbve',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})