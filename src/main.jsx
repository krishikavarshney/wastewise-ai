import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const cropData = {
  Wheat: {
    disease: "Leaf Rust",
    confidence: 94,
    risk: 68,
    severity: "Moderate",
    affected: "18%",
    action:
      "Inspect affected leaves, increase monitoring and follow locally approved crop-management guidance."
  },
  Rice: {
    disease: "Brown Spot",
    confidence: 91,
    risk: 42,
    severity: "Low",
    affected: "10%",
    action:
      "Continue regular monitoring and maintain suitable field conditions."
  },
  Tomato: {
    disease: "Early Blight",
    confidence: 96,
    risk: 82,
    severity: "High",
    affected: "27%",
    action:
      "Inspect affected plants immediately and follow locally approved disease-management guidance."
  },
  Cotton: {
    disease: "Pest Infestation Risk",
    confidence: 89,
    risk: 61,
    severity: "Moderate",
    affected: "15%",
    action:
      "Inspect plants for pest activity and follow integrated pest-management guidance."
  }
};

const initialCrops = [
  { name: "Wheat", area: "4.5 acres", status: "Moderate Risk", icon: "🌾" },
  { name: "Rice", area: "3.2 acres", status: "Low Risk", icon: "🌱" },
  { name: "Tomato", area: "2.1 acres", status: "High Risk", icon: "🍅" },
  { name: "Cotton", area: "5 acres", status: "Moderate Risk", icon: "🌿" }
];

const history = [
  ["Wheat", "Leaf Rust", 68, "Moderate", "Today"],
  ["Tomato", "Early Blight", 82, "High", "Yesterday"],
  ["Rice", "Brown Spot", 42, "Low", "28 Aug"],
  ["Cotton", "Pest Risk", 61, "Moderate", "25 Aug"]
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [crop, setCrop] = useState("Wheat");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const [crops, setCrops] = useState(initialCrops);
  const [showAddCrop, setShowAddCrop] = useState(false);

  const [newCropName, setNewCropName] = useState("");
  const [newCropArea, setNewCropArea] = useState("");

  const data = cropData[crop] || {
    disease: "Monitoring Required",
    confidence: 86,
    risk: 45,
    severity: "Moderate",
    affected: "Unknown",
    action:
      "Continue regular monitoring and upload a clear crop image for detailed analysis."
  };

  function scanCrop() {
    setResult(data);
  }

  function uploadImage(e) {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  }

  function addCrop() {
    const name = newCropName.trim();

    if (!name) {
      alert("Please enter crop name.");
      return;
    }

    const exists = crops.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("This crop is already added.");
      return;
    }

    const icons = ["🌱", "🌾", "🌿", "🥕", "🥔", "🌻"];

    const newCrop = {
      name,
      area: newCropArea.trim() || "Area not added",
      status: "Monitoring",
      icon: icons[crops.length % icons.length]
    };

    setCrops([...crops, newCrop]);
    setCrop(name);
    setNewCropName("");
    setNewCropArea("");
    setShowAddCrop(false);
  }

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">🌱</div>
          <div>
            <h2>CropGuard</h2>
            <span>AI Crop Health</span>
          </div>
        </div>

        <nav>
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className={page === "scan" ? "active" : ""}
            onClick={() => setPage("scan")}
          >
            📸 AI Crop Scan
          </button>

          <button
            className={page === "risk" ? "active" : ""}
            onClick={() => setPage("risk")}
          >
            🚨 Risk Analysis
          </button>

          <button
            className={page === "forecast" ? "active" : ""}
            onClick={() => setPage("forecast")}
          >
            🌦️ 7-Day Forecast
          </button>

          <button
            className={page === "alerts" ? "active" : ""}
            onClick={() => setPage("alerts")}
          >
            🔔 Smart Alerts
          </button>

          <button
            className={page === "history" ? "active" : ""}
            onClick={() => setPage("history")}
          >
            📊 Crop History
          </button>

          <button
            className={page === "impact" ? "active" : ""}
            onClick={() => setPage("impact")}
          >
            📈 Impact Dashboard
          </button>
        </nav>

        <div className="system-status">
          <span></span> AI System Online
        </div>
      </aside>


      {/* MAIN */}
      <main className="main">

        <header className="topbar">

          <div>
            <p className="eyebrow">SMART CROP MONITORING</p>

            <h1>
              {page === "dashboard" && "Good Morning, Farmer 👋"}
              {page === "scan" && "AI Crop Scan"}
              {page === "risk" && "Disease & Risk Analysis"}
              {page === "forecast" && "7-Day Risk Forecast"}
              {page === "alerts" && "Smart Alerts"}
              {page === "history" && "Crop Health History"}
              {page === "impact" && "Impact Dashboard"}
            </h1>
          </div>

          <div className="profile">
            <div className="avatar">👨‍🌾</div>

            <div>
              <strong>Farmer</strong>
              <small>Field Manager</small>
            </div>
          </div>

        </header>


        {/* ================= DASHBOARD ================= */}

        {page === "dashboard" && (
          <section>

            <div className="hero">

              <div>
                <span className="tag">
                  AI-POWERED CROP PROTECTION
                </span>

                <h2>
                  Detect crop problems before they spread.
                </h2>

                <p>
                  CropGuard helps farmers identify possible diseases
                  and pest risks early and take timely action.
                </p>

                <button
                  className="primary"
                  onClick={() => setPage("scan")}
                >
                  📸 Scan Crop
                </button>
              </div>

              <div className="hero-plant">🌾</div>

            </div>


            {/* MY CROPS SECTION */}

            <div className="section-title crop-section-title">

              <div>
                <h2>My Crops</h2>
                <p>Your currently monitored crops</p>
              </div>

              <button
                className="add-crop-btn"
                onClick={() => setShowAddCrop(true)}
              >
                + Add Crop
              </button>

            </div>


            <div className="crop-list">

              {crops.map((item, index) => {

                const riskData = cropData[item.name];

                return (
                  <div className="crop-card" key={index}>

                    <div className="crop-card-icon">
                      {item.icon}
                    </div>

                    <div className="crop-card-info">
                      <h3>{item.name}</h3>
                      <p>{item.area}</p>
                    </div>

                    <div className="crop-card-right">

                      <Badge
                        type={
                          riskData?.severity === "High"
                            ? "high"
                            : riskData?.severity === "Low"
                            ? "low"
                            : "moderate"
                        }
                      >
                        {riskData
                          ? `${riskData.risk}% Risk`
                          : "Monitoring"}
                      </Badge>

                    </div>

                  </div>
                );

              })}

            </div>


            <div className="section-title">
              <h2>Farm Overview</h2>
              <p>Current crop health status</p>
            </div>


            <div className="stats">

              <Stat
                icon="🌱"
                title="Crops Monitored"
                value={crops.length}
              />

              <Stat
                icon="🟢"
                title="Healthy Crops"
                value="15"
              />

              <Stat
                icon="🟡"
                title="Monitoring"
                value="6"
              />

              <Stat
                icon="🔴"
                title="High Risk"
                value="3"
              />

            </div>


            <div className="two">

              <div className="card">

                <div className="card-head">

                  <div>
                    <h3>🌦️ Weather-Based Risk</h3>
                    <p>Current conditions</p>
                  </div>

                  <Badge type="moderate">
                    MODERATE
                  </Badge>

                </div>

                <div className="weather">

                  <Weather
                    icon="🌡️"
                    value="29°C"
                    name="Temperature"
                  />

                  <Weather
                    icon="💧"
                    value="78%"
                    name="Humidity"
                  />

                  <Weather
                    icon="🌧️"
                    value="12 mm"
                    name="Rainfall"
                  />

                </div>

                <div className="warning">
                  ⚠️ High humidity may increase fungal disease risk.
                </div>

              </div>


              <div className="card">

                <div className="card-head">

                  <div>
                    <h3>🚨 Latest Detection</h3>
                    <p>Most recent scan</p>
                  </div>

                  <Badge type="high">
                    HIGH RISK
                  </Badge>

                </div>

                <div className="latest">

                  <div className="crop-symbol">🍅</div>

                  <div>
                    <h3>Tomato</h3>
                    <p>Early Blight detected</p>
                    <strong>82% Risk Score</strong>
                  </div>

                </div>

                <button
                  className="outline"
                  onClick={() => setPage("risk")}
                >
                  View Risk Analysis →
                </button>

              </div>

            </div>

          </section>
        )}


        {/* ================= AI SCAN ================= */}

        {page === "scan" && (
          <section>

            <div className="intro">
              <span className="tag">AI VISION ANALYSIS</span>

              <h2>Scan your crop</h2>

              <p>
                Upload a crop image and select the crop type to identify
                possible disease or pest risks.
              </p>
            </div>


            <div className="scan-layout">

              <div className="card">

                <h3>1. Select Crop</h3>

                <select
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setResult(null);
                  }}
                >

                  {crops.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}

                </select>


                <h3 className="upload-heading">
                  2. Upload Crop Image
                </h3>

                <label className="upload">

                  {image ? (
                    <img
                      src={image}
                      alt="Crop preview"
                    />
                  ) : (
                    <>
                      <div>📷</div>
                      <strong>
                        Upload leaf / crop image
                      </strong>
                      <span>
                        JPG, JPEG or PNG
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                  />

                </label>


                <button
                  className="primary full"
                  onClick={scanCrop}
                >
                  🔍 Analyze Crop
                </button>

              </div>


              <div className="card">

                <h3>AI Detection Result</h3>

                {!result ? (

                  <div className="empty">

                    <div>🌿</div>

                    <h3>No Scan Yet</h3>

                    <p>
                      Upload an image and click Analyze Crop.
                    </p>

                  </div>

                ) : (

                  <>
                    <div className="result-top">

                      <div>⚠️</div>

                      <div>

                        <span>Possible Detection</span>

                        <h2>{result.disease}</h2>

                        <p>{crop} crop</p>

                      </div>

                    </div>


                    <div className="result-grid">

                      <Result
                        label="AI Confidence"
                        value={`${result.confidence}%`}
                      />

                      <Result
                        label="Severity"
                        value={result.severity}
                      />

                      <Result
                        label="Risk Score"
                        value={`${result.risk}%`}
                      />

                      <Result
                        label="Affected Area"
                        value={result.affected}
                      />

                    </div>


                    <div className="action">

                      <h3>📋 Recommended Action</h3>

                      <p>
                        {result.action}
                      </p>

                    </div>

                  </>

                )}

              </div>

            </div>


            <div className="demo">
              💡 <strong>Prototype Demo:</strong>{" "}
              Detection results are simulated. A production version
              can connect a trained crop-disease ML model.
            </div>

          </section>
        )}


        {/* ================= RISK ================= */}

        {page === "risk" && (
          <section>

            <div className="intro">

              <span className="tag">
                RISK INTELLIGENCE
              </span>

              <h2>Disease & Risk Analysis</h2>

              <p>
                Understand why your crop may be at risk.
              </p>

            </div>


            <div className="risk-hero">

              <div>

                <span>OVERALL CROP RISK</span>

                <h2>68%</h2>

                <p>Moderate Risk</p>

              </div>

              <div className="risk-circle">
                68
              </div>

            </div>


            <div className="weather four">

              <Weather
                icon="🌡️"
                value="29°C"
                name="Temperature"
              />

              <Weather
                icon="💧"
                value="78%"
                name="Humidity"
              />

              <Weather
                icon="🌧️"
                value="12 mm"
                name="Rainfall"
              />

              <Weather
                icon="🌾"
                value="68%"
                name="Disease Risk"
              />

            </div>


            <div className="card reasons">

              <h3>Why is the risk elevated?</h3>

              <Reason
                icon="💧"
                title="High Humidity"
                text="Humid conditions can support the development of several fungal crop diseases."
              />

              <Reason
                icon="🌧️"
                title="Recent Rainfall"
                text="Rainfall can increase moisture around crops and create favorable conditions for some diseases."
              />

              <Reason
                icon="🔍"
                title="Previous Detection"
                text="Previous scans indicate that continued crop monitoring is recommended."
              />

            </div>

          </section>
        )}


        {/* ================= FORECAST ================= */}

        {page === "forecast" && (
          <section>

            <div className="intro">

              <span className="tag">
                PREDICTIVE MONITORING
              </span>

              <h2>7-Day Disease Risk Forecast</h2>

              <p>
                See how upcoming environmental conditions may affect crop health.
              </p>

            </div>


            <div className="forecast-alert">

              <div>⚠️</div>

              <div>

                <strong>
                  Risk may increase in the next 48 hours
                </strong>

                <p>
                  Higher humidity and rainfall may create favorable
                  conditions for fungal diseases.
                </p>

              </div>

            </div>


            <div className="forecast">

              {[
                ["Today", "🌤️", "29°C", "68%", "Moderate"],
                ["Tomorrow", "🌧️", "28°C", "74%", "Moderate"],
                ["Day 3", "🌧️", "27°C", "81%", "High"],
                ["Day 4", "☁️", "28°C", "72%", "Moderate"],
                ["Day 5", "☀️", "30°C", "59%", "Low"],
                ["Day 6", "🌤️", "31°C", "54%", "Low"],
                ["Day 7", "☀️", "32°C", "48%", "Low"]
              ].map((d, i) => (

                <div className="forecast-card" key={i}>

                  <strong>{d[0]}</strong>

                  <div className="forecast-icon">
                    {d[1]}
                  </div>

                  <span>{d[2]}</span>

                  <div className="forecast-risk">

                    <small>Risk</small>

                    <b>{d[3]}</b>

                  </div>

                  <Badge
                    type={
                      d[4] === "High"
                        ? "high"
                        : d[4] === "Low"
                        ? "low"
                        : "moderate"
                    }
                  >
                    {d[4]}
                  </Badge>

                </div>

              ))}

            </div>


            <div className="card forecast-advice">

              <h3>🌱 Recommended Monitoring</h3>

              <p>
                Increase crop inspection during the next 2–3 days,
                especially after rainfall. Early identification can
                help farmers take timely management decisions.
              </p>

            </div>


            <div className="demo">

              💡 <strong>Prototype Forecast:</strong>{" "}
              Forecast values are simulated demo data. A production
              system can use live weather data and trained disease-risk models.

            </div>

          </section>
        )}


        {/* ================= ALERTS ================= */}

        {page === "alerts" && (
          <section>

            <div className="intro">

              <span className="tag">
                ACTION CENTER
              </span>

              <h2>Smart Alerts</h2>

              <p>
                Important crop-health updates that may require attention.
              </p>

            </div>


            <div className="alerts">

              <Alert
                icon="🚨"
                title="Tomato Field — High Risk"
                badge="82% RISK"
                type="high"
                text="Early Blight risk detected during the latest crop scan."
                action="Inspect affected plants immediately."
              />

              <Alert
                icon="🌧️"
                title="Weather Risk Alert"
                badge="MONITOR"
                type="moderate"
                text="High humidity and rainfall are expected over the next 48 hours."
                action="Increase crop monitoring for fungal symptoms."
              />

              <Alert
                icon="🔍"
                title="Wheat Field — Monitoring"
                badge="68% RISK"
                type="moderate"
                text="Leaf Rust indicators were detected in the latest scan."
                action="Re-scan the crop after monitoring the affected area."
              />

              <Alert
                icon="✅"
                title="Rice Field — Stable"
                badge="42% RISK"
                type="low"
                text="Current disease risk remains low."
                action="Continue regular crop monitoring."
              />

            </div>

          </section>
        )}


        {/* ================= HISTORY ================= */}

        {page === "history" && (
          <section>

            <div className="intro">

              <span className="tag">
                HISTORICAL MONITORING
              </span>

              <h2>Crop Health History</h2>

              <p>
                Track previous scans and changing crop-risk levels.
              </p>

            </div>


            <div className="card">

              <h3>Risk Trend</h3>

              <div className="chart">

                {history.map((item, i) => (

                  <div className="bar-wrapper" key={i}>

                    <div
                      className="bar"
                      style={{
                        height: `${item[2] * 1.9}px`
                      }}
                    >
                      {item[2]}%
                    </div>

                    <small>{item[0]}</small>

                  </div>

                ))}

              </div>

            </div>


            <div className="card history-card">

              <h3>Previous Scans</h3>

              {history.map((item, i) => (

                <div className="history-row" key={i}>

                  <div className="history-name">

                    🌱

                    <div>
                      <strong>{item[0]}</strong>
                      <small>{item[1]}</small>
                    </div>

                  </div>

                  <Badge
                    type={
                      item[3] === "High"
                        ? "high"
                        : item[3] === "Low"
                        ? "low"
                        : "moderate"
                    }
                  >
                    {item[3]}
                  </Badge>

                  <strong>{item[2]}%</strong>

                  <small>{item[4]}</small>

                </div>

              ))}

            </div>

          </section>
        )}


        {/* ================= IMPACT ================= */}

        {page === "impact" && (
          <section>

            <div className="intro">

              <span className="tag">
                SYSTEM IMPACT
              </span>

              <h2>Impact Dashboard</h2>

              <p>
                Measure how early detection and monitoring can improve
                crop health management.
              </p>

            </div>


            <div className="impact-grid">

              <Impact
                icon="🌱"
                value={crops.length}
                title="Crops Monitored"
                text="Fields actively monitored"
              />

              <Impact
                icon="🔍"
                value="8"
                title="Issues Detected"
                text="Potential disease or pest risks"
              />

              <Impact
                icon="⚡"
                value="82%"
                title="Early Detection"
                text="Potential issues identified early"
              />

              <Impact
                icon="🛡️"
                value="31%"
                title="Risk Reduction"
                text="Estimated improvement after action"
              />

              <Impact
                icon="💧"
                value="18%"
                title="Resource Saving"
                text="Estimated avoidable resource use"
              />

              <Impact
                icon="📈"
                value="+24%"
                title="Crop Health"
                text="Improvement in monitored crop health"
              />

            </div>


            <div className="two">

              <div className="card">

                <h3>Crop Health Distribution</h3>

                <div className="health-bars">

                  <Progress
                    label="Healthy Crops"
                    value="63%"
                  />

                  <Progress
                    label="Under Monitoring"
                    value="25%"
                  />

                  <Progress
                    label="High Risk"
                    value="12%"
                  />

                </div>

              </div>


              <div className="card impact-message">

                <div className="impact-icon-big">
                  🌾
                </div>

                <h3>
                  Why Early Detection Matters
                </h3>

                <p>
                  Identifying crop health problems early helps farmers
                  take timely management decisions, reduce potential
                  crop losses and improve overall farm monitoring.
                </p>

              </div>

            </div>


            <div className="demo">

              💡 <strong>Prototype Metrics:</strong>{" "}
              Impact values are demo estimates. Real impact can be
              calculated from actual field, scan and crop-health data.

            </div>

          </section>
        )}

      </main>


      {/* ================= ADD CROP MODAL ================= */}

      {showAddCrop && (

        <div
          className="modal-overlay"
          onClick={() => setShowAddCrop(false)}
        >

          <div
            className="add-crop-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-head">

              <div>
                <span className="tag">
                  FARM MANAGEMENT
                </span>

                <h2>Add New Crop</h2>

                <p>
                  Add a crop to your farm monitoring list.
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowAddCrop(false)}
              >
                ×
              </button>

            </div>


            <label>
              Crop Name
            </label>

            <input
              type="text"
              placeholder="e.g. Maize"
              value={newCropName}
              onChange={(e) =>
                setNewCropName(e.target.value)
              }
            />


            <label>
              Field Area
            </label>

            <input
              type="text"
              placeholder="e.g. 3 acres"
              value={newCropArea}
              onChange={(e) =>
                setNewCropArea(e.target.value)
              }
            />


            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowAddCrop(false)}
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={addCrop}
              >
                + Add Crop
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================= COMPONENTS ================= */

function Stat({ icon, title, value }) {
  return (
    <div className="stat">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

    </div>
  );
}


function Weather({ icon, value, name }) {
  return (
    <div className="weather-item">

      <span>{icon}</span>

      <strong>{value}</strong>

      <small>{name}</small>

    </div>
  );
}


function Badge({ type, children }) {
  return (
    <span className={`badge ${type}`}>
      {children}
    </span>
  );
}


function Result({ label, value }) {
  return (
    <div className="result">

      <small>{label}</small>

      <strong>{value}</strong>

    </div>
  );
}


function Reason({ icon, title, text }) {
  return (
    <div className="reason">

      <span>{icon}</span>

      <div>

        <strong>{title}</strong>

        <p>{text}</p>

      </div>

    </div>
  );
}


function Alert({
  icon,
  title,
  badge,
  type,
  text,
  action
}) {
  return (
    <div className={`alert ${type}`}>

      <div className="alert-icon">
        {icon}
      </div>

      <div className="alert-body">

        <div className="alert-head">

          <h3>{title}</h3>

          <Badge type={type}>
            {badge}
          </Badge>

        </div>

        <p>{text}</p>

        <span>
          <strong>Recommended:</strong>{" "}
          {action}
        </span>

      </div>

    </div>
  );
}


function Impact({
  icon,
  value,
  title,
  text
}) {
  return (
    <div className="impact">

      <div className="impact-icon">
        {icon}
      </div>

      <div>

        <span>{title}</span>

        <h2>{value}</h2>

        <p>{text}</p>

      </div>

    </div>
  );
}


function Progress({ label, value }) {
  return (
    <div className="progress-row">

      <div>

        <span>{label}</span>

        <strong>{value}</strong>

      </div>

      <div className="progress">

        <div style={{ width: value }}></div>

      </div>

    </div>
  );
}


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);