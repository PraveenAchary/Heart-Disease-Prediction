import React,{Component, useState} from "react";
import App from "./App";
import axios from "axios";

export default function PredictDisease()
{
    const [cp, setCp] = useState(0);
    const [ecg,setECG] = useState(0);
    const [slope,setSlope] = useState(0);
    const [ca,setCa] = useState(0);
    const [thal,setThal] = useState(1);

    const [result,setResult] = useState(null);

    const thallabels = [
        "",             
        "Normal",
        "Fixed Defect",
        "Reversible Defect"
    ];

    const slopelabels = [
        "Upsloping",
        "Flat",
        "Downsloping"
    ]

    const labels = [
        "Typical Angina / No Pain",
        "Atypical Angina / Little Pain",
        "Non-anginal Pain / Moderate Pain",
        "Asymptomatic / Severe Pain/Feeling Like Ticket confirmed to Hell/Heaven"
    ];

    const ecglabels = [
        "Normal",
        "ST-T abnormality",
        "LV hypertrophy"
    ]

    const handleSubmit = async (e)=>{
        e.preventDefault();

        // collect all input values
        const data = {
            name:e.target.name.value,
            sex:Number(e.target.sex.value),
            cp:cp,
            trestbps:Number(e.target.trestbps.value),
            chol: Number(e.target.chol.value),
            fbs: Number(e.target.fbs.value),
            restecg: ecg,
            thalach: Number(e.target.thalach.value),
            exang: Number(e.target.exang.value),
            oldpeak: Number(e.target.oldpeak.value),
            slope: slope,
            ca: ca,
            thal: thal
        };

        try
        {
            const res = await axios.post("http://localhost:8000/api/predict/",data);
            console.log(res.data);
            
            if(Number(res.data.Prediction) === 1)
                setResult("Heart Disease");
            else
                setResult("No Heart Disease");
        }
        catch(err)
        {
            console.error(err);
            setResult("Error in Prediction");   
        }
    };

    return (
        <div className="container">
            <h1>Heart Disease Prediction</h1>
            <form onSubmit={handleSubmit}>
                <h2>Name:<input type="text" name="name" required/></h2>
                <h2>Gender:<select name="sex">
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                </h2>
                <h2>Chest Pain Range:{cp}
                     <input type="range" min="0" max="3" step="1" value={cp} onChange={(e) => setCp(Number(e.target.value))}/>
                     <p><strong>{cp}</strong> — {labels[cp]}</p>
                </h2>
                <h2>Resting Blood Pressure:(mm Hg):
                    <input type="Number" name="trestbps" min="50" max="250" placeholder="eg 230" required/>
                </h2>
                <h2>Cholestrol:
                    <input type="Number" placeholder="eg 315" name="chol" min="100" max="400" required/>            
                </h2>
                <h2>Fasting Blood Sugar:</h2>
                    <select id="fbs" name="fbs" required>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                <h2>Resting ECG Result:{ecg}</h2>
                <input type="range" name="restecg" min="0" max="2" step="1" value={ecg} onChange={(e)=>setECG(Number(e.target.value))}/>
                    <p>{ecg}-{ecglabels[ecg]}</p>
                <h2> Maximum Heart Rate Achieved (bpm): <input type="number" name="thalach" min="60" max="220" placeholder="eg 150" required /> </h2>
                
                <h2>Exercise-Induced Angina:</h2>
                <select name="exang">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
                <h2>ST Depression (oldpeak) induced by exercise:</h2>
                <input type="Number" name="oldpeak" step="0.1" min="0" max="6" placeholder="eg,1.2" required/>
                <h2>Slope:{slope}</h2>
                <input type="range" min="0" max="2" step="1" value={slope} name="slope" onChange={(e)=>setSlope(Number(e.target.value))}/>
                <p>{slope}-{slopelabels[slope]}</p>
                <h2>Number of Major Vessels Colored by Fluoroscopy:</h2>
                <input type="range" min="0" max="3" step="1" value={ca} onChange={(e)=>setCa(Number(e.target.value))}/>
                <p>{ca}vessel{ca===0?" ":"s"}</p>
                <h2>Thalassemia:</h2> <input type="range" min="1" max="3" step="1" value={thal} onChange={(e) => setThal(Number(e.target.value))} /> <p>{thal} — {thallabels[thal]}</p>
                <button type="submit">Check</button>
            </form>

            {/* <h2>Prediction:{result}</h2>
            {console.log(result)} */}
                    {result && (
  <div className={`result ${result === "Heart Disease" ? "bad" : "good"}`}>
    {result}
  </div>
)}


        </div>
    );
}