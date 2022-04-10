const { fetch, fetchOne } = require("../Library/database/postgres")
const axios = require('axios');

const clinicsSql = `
    select * from clinics
`

const createClinicSql = `
insert into clinics (clinic_name, clinic_location_lang, clinic_location_lat, clinic_phone_number, clinic_website, clinic_services, clinic_work_hours, clinic_img_link) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *
`

const deleteClinicSql = `
    delete from clinics where clinic_id = $1 returning *
`
const patientsSql = `
insert into patients (patient_address, patient_name, patient_service, patient_age) values ($1, $2, $3, $4) returning *
`

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return (12742 * Math.asin(Math.sqrt(a))) * 1.6; // 2 * R; R = 6371 km
}

const clinics = async( req ) => {
  console.log(req.query)
  if(req.query.all){
    return await fetch(clinicsSql)
  }
  if(req.query.service && req.query.address){
 const {service, address, age, name} = req.query
const patient = await fetch(patientsSql, address, name, service, age)
console.log(patient)
   const all = await fetch(clinicsSql);
   let ans = []
  let ai = axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q="${address}`)
  .then(response => {
    const {lat, lon} = response.data[0];
    for (let i = 0; i < all.length; i++) {
    let dist = distance( Number(all[i].clinic_location_lat), Number(all[i].clinic_location_lang),Number(lat), Number(lon));
  all[i].dist = [dist.toFixed(2)];
  (all[i].clinic_services).toLowerCase().includes(service.toLowerCase()) ? ans.push(all[i]) : null
  }

  ans = ans.sort(function(a, b) {
  return a.dist[0] - b.dist[0];
});
  return ans.slice(0, 5);
  }).catch(error => {
    console.log(error);
  });
  return ai
  }
 
}
    


const createClinic = async ({ body }) => {

    const { clinic_name, clinic_location_lang, clinic_location_lat, clinic_phone_number, clinic_website, clinic_services, clinic_work_hours, clinic_img_link} = body

    return (
        await fetchOne(createClinicSql, clinic_name, clinic_location_lang, clinic_location_lat, clinic_phone_number, clinic_website, clinic_services, clinic_work_hours, clinic_img_link)
    )
   
}

const updateClinic = async ({ body }) => {
   
  
        const { clinic_id, column, value } = body
        return await fetchOne(`update clinics set ${column} = $2 where clinic_id = $1 returning *`, clinic_id, value)
    
}

const deleteClinic = async ({ clinic_id }) => {

    return await fetchOne(deleteClinicSql, clinic_id)
}

module.exports.clinics = clinics
module.exports.createClinic = createClinic
module.exports.updateClinic = updateClinic
module.exports.deleteClinic = deleteClinic