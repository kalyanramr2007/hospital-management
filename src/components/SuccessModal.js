import { QRCodeSVG } from "qrcode.react";
import "./SuccessModal.css";

export default function SuccessModal({ patient, onClose }) {
  if (!patient) return null;

  const qrValue = JSON.stringify({
    token: patient.token,
    name: patient.patientName,
    time: patient.appointmentTimestamp,
  });

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <div className="modal success-modal">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="success-modal__icon">✅</div>
        <h2 id="success-title">Registration Successful!</h2>
        <p>Your token has been generated. Please save this information.</p>

        <div className="success-modal__token">
          <span className="success-modal__token-label">Your Token</span>
          <strong>{patient.token}</strong>
        </div>

        <div className="success-modal__qr">
          <QRCodeSVG value={qrValue} size={140} level="M" includeMargin />
          <small>Scan to verify your token</small>
        </div>

        <ul className="success-modal__details">
          <li><strong>Name:</strong> {patient.patientName}</li>
          <li><strong>Priority:</strong> {patient.priorityType}</li>
          <li>
            <strong>Time:</strong>{" "}
            {new Date(patient.appointmentTimestamp).toLocaleString()}
          </li>
        </ul>

        <button type="button" className="btn btn--primary" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
