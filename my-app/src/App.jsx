import "./App.css";
import { useState } from "react";
function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState();
  let queryString = `http://localhost:3003/clinics/?address=${data.address}&service=${data.services}&name=${data.name}&age=${data.age}`;
  const getData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(queryString);
    const jsonData = await res.json();
    setTempData(jsonData?.data);
    setIsLoading(false);
  };
  return (
    <div class="container">
      <span class="nav">MEDICAL HELP CENTERS</span>
      <div class="wrapper">
        <div class="leftInputs">
          <form action="#" onSubmit={getData}>
            <span>Patient's information</span>
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => {
                setData((prev) => ({ ...prev, name: e.target.value }));
              }}
              placeholder="e.x John Wick"
              required
            ></input>
            <label for="adress">Adress</label>
            <input
              type="text"
              onChange={(e) =>
                setData((prev) => ({ ...prev, address: e.target.value }))
              }
              id="adress"
              placeholder="Location"
              required
            ></input>
            <label for="age">Age</label>
            <input
              type="number"
              id="age"
              onChange={(e) =>
                setData((prev) => ({ ...prev, age: e.target.value }))
              }
              placeholder="Age"
              required
              min="0"
              max="120"
            ></input>
            <label for="services">Services</label>
            <select  
              id="services"
              onChange={(e) =>
                setData((prev) => ({ ...prev, services: e.target.value }))
              }
              placeholder=""
            >
              <option>Arrhythmology</option>
              <option>X-ray</option>
              <option>Coronary angiography</option>
              <option>Cardiac surgery</option>
              <option>Hepatology</option>
              <option>Orthopedics</option>
              <option>Gastroenterology</option>
              <option>Ophthalmology</option>
              <option>Orthopedics</option>
              <option>Gynecology</option>
              <option>Neurology</option>
              <option>Rhinology</option>
              <option>Urology</option>
              <option>Surgery</option>
              <option>Endocrinology</option>
              <option>Cardiologist</option>
              <option>Ultrasound</option>
              <option>Neurosurgeon</option>
              <option>Therapy</option>
              <option>Pediatrician</option>
              <option>Laboratory</option>
              <option>Traumatologist</option>
            </select>
            <button disabled={isLoading} type="submit" id="btnSubmit">
              Submit
            </button>
          </form>
          <div className="box">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : tempData && tempData.length < 1 ? (
              <h2>No clincs</h2>
            ) : (
              tempData &&
              tempData.map((clinic) => {
                return (
                  <div className="box__inner" key={clinic.clinic_id}>
                    {" "}
                    <img
                      style={{ width: "200px", height: "100px" }}
                      src={clinic.clinic_img_link}
                      alt={clinic.clinic_name}
                    />{" "}
                    <p>{clinic.clinic_phone_number}</p>{" "}
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={clinic.clinic_website}
                    >
                      {clinic.clinic_name}
                    </a>{" "}
                    <h4>{clinic.clinic_name}</h4>{" "}
                    <p>{clinic.clinic_work_hours}</p>{" "}
                    <p>services: {clinic.clinic_services}</p>{" "}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div class="rightHeader">
          <span class="textHeader">Every</span>
          <span class="textHeader">Information</span>
          <span class="textHeader">Nurses</span>
          <span class="textHeader">Needs</span>
        </div>
      </div>
    </div>
  );
}

export default App;
