const { fetch, fetchOne } = require("../Library/database/postgres")


const patientsSql = `
    select * from patients
`

const createPatientSql = `
insert into patients (patient_location_lang, patient_location_lat, patient_name, patient_need, patient_time, patient_phonenumber) values ($1, $2, $3, $4, $5, $6) returning *
`

const deletePatientSql = `
    delete from patients where patient_id = $1 returning *
`

const patients = async () => {
    return await fetch(patientsSql)
}  

const createPatient = async ({ body }) => {

    const { patient_location_lang, patient_location_lat, patient_name, patient_need, patient_time, patient_phonenumber} = body

    return (
        await fetchOne(createPatientSql,patient_location_lang, patient_location_lat, patient_name, patient_need, patient_time, patient_phonenumber)
    )
   
}

const updatePatient = async ({ body }) => {
   
  
        const { patient_id, column, value } = body
        return await fetchOne(`update patients set ${column} = $2 where patient_id = $1 returning *`, patient_id, value)
    
}

const deletePatient = async ({ patient_id }) => {

    return await fetchOne(deletePatientSql, patient_id)
}

module.exports.patients = patients
module.exports.createPatient = createPatient
module.exports.updatePatient = updatePatient
module.exports.deletePatient = deletePatient