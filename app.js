const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//HOMEPAGE
app.get('/', (req, res) => {
	res.render('home.ejs');
});

// SEARCH FOR BEER LOGIC
app.post('/', async (req, res) => {
	const beer = req.body.search;
	const response = await axios.get(
		`https://api.punkapi.com/v2/beers?beer_name=${beer}&per_page=80`
	);
	let data = response.data;
	res.render('results', { data, beer });
});

//SHOW MORE INFO ABOUT A BEER
app.get('/:id', async (req, res) => {
	const id = req.params.id;
	const response = await axios.get(
		`https://api.punkapi.com/v2/beers?ids=${id}`
	);
	let data = response.data;
	res.render('show', { data });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log('Server Has Started');
});
