const axios = require('axios');
let address = 'Yunusobod 4 mavzesi, Tashkent,Uzbekistan'

axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q="${address}`)
  .then(response => {
    
    console.log(response.data)
  }).catch(error => {
    console.log(error);
  });