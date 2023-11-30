import React, { useState } from "react";
import "./Popup.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Water Quality Info
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 >Water Quality Info</h2>
            <>
                <p>
                <strong>TDS (Total Dissolved Solids)</strong> is a measure of the total amount of dissolved minerals, salts, and metals in water.
                TDS is measured in parts per million (ppm).
                </p>
                <p>
                <strong>EC (Electrical Conductivity)</strong> is a measure of the ability of water to conduct electricity. EC is measured in microsiemens per centimeter (µS/cm).
                </p>
                <br />
                <p>
                <strong>Acceptable TDS Range:</strong> The acceptable range for TDS in drinking water is generally considered to be less than 500 ppm.
                </p>
                <p>
                <strong>Acceptable EC Range:</strong> The acceptable range for EC in drinking water is generally considered to be less than 2.0 µS/cm.
                </p>
                <br />
                <p>
                    <strong>TDS Interpretation:</strong>
                    <br />
                    * Less than 500 ppm: Considered safe for drinking water.
                    <br />
                    * 500-1000 ppm: May have a slightly salty or metallic taste.
                    <br />
                    * 1000-3000 ppm: May have a noticeable salty or metallic taste and may cause laxative effects in sensitive individuals.
                    <br />
                    * Above 3000 ppm: May be unpalatable and may cause gastrointestinal distress.
                </p>
                <br />
                <p>
                    <strong>EC Interpretation:</strong>
                    <br />
                    * Less than 2.0 µS/cm: Considered safe for drinking water.
                    <br />
                    * 2.0-5.0 µS/cm: May indicate the presence of dissolved minerals or salts.
                    <br />
                    * 5.0-10.0 µS/cm: May indicate the presence of moderate levels of dissolved minerals or salts.
                    <br />
                    * Above 10.0 µS/cm: May indicate the presence of high levels of dissolved minerals or salts and may affect the taste of the water.
                </p>
                </>
                        <button className="close-modal" onClick={toggleModal}>
                        CLOSE
                        </button>
                    </div>
                    </div>
                )}
                
            </>
  );
}
