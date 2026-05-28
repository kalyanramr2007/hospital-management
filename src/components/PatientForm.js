import { useState } from "react";
import { addPatient, getTodayPatientCount } from "../firebase/firestoreService";
import { generateToken } from "../utils/tokenGenerator";
import { validatePatientForm, hasErrors } from "../utils/validation";
import { GENDER_OPTIONS, PRIORITY_TYPES } from "../utils/constants";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";
import SuccessModal from "./SuccessModal";
import "./PatientForm.css";

const INITIAL_FORM = {
  patientName: "",
  age: "",
  gender: "",
  mobile: "",
  symptoms: "",
  priorityType: PRIORITY_TYPES.NORMAL,
};

export default function PatientForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(null);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePatientForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      showToast("Please fix the form errors", "error");
      return;
    }

    setSubmitting(true);
    try {
      const count = await getTodayPatientCount();
      const token = generateToken(count + 1);

      const patientData = {
        patientName: form.patientName.trim(),
        age: Number(form.age),
        gender: form.gender,
        mobile: form.mobile.replace(/\s/g, ""),
        symptoms: form.symptoms.trim(),
        priorityType: form.priorityType,
        token,
      };

      await addPatient(patientData);

      const registered = {
        ...patientData,
        appointmentTimestamp: new Date().toISOString(),
      };

      setRegisteredPatient(registered);
      setForm(INITIAL_FORM);
      setErrors({});
      showToast("Registration successful! Token: " + token, "success");
    } catch (err) {
      console.error(err);
      showToast("Registration failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return <LoadingSpinner message="Registering patient..." />;
  }

  return (
    <>
      <form className="patient-form card" onSubmit={handleSubmit} noValidate>
        <h2 className="patient-form__title">Patient Registration</h2>
        <p className="patient-form__subtitle">
          Fill in your details to receive a queue token instantly.
        </p>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name *</label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              value={form.patientName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.patientName ? "input--error" : ""}
            />
            {errors.patientName && <span className="error-text">{errors.patientName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              max="150"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className={errors.age ? "input--error" : ""}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={errors.gender ? "input--error" : ""}
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={errors.mobile ? "input--error" : ""}
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>

          <div className="form-group form-group--full">
            <label htmlFor="symptoms">Symptoms *</label>
            <textarea
              id="symptoms"
              name="symptoms"
              rows={3}
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Describe your symptoms"
              className={errors.symptoms ? "input--error" : ""}
            />
            {errors.symptoms && <span className="error-text">{errors.symptoms}</span>}
          </div>

          <div className="form-group form-group--full">
            <label>Priority Type *</label>
            <div className="priority-options">
              <label className={`priority-option ${form.priorityType === PRIORITY_TYPES.NORMAL ? "priority-option--active" : ""}`}>
                <input
                  type="radio"
                  name="priorityType"
                  value={PRIORITY_TYPES.NORMAL}
                  checked={form.priorityType === PRIORITY_TYPES.NORMAL}
                  onChange={handleChange}
                />
                <span>🟢 Normal</span>
              </label>
              <label className={`priority-option priority-option--emergency ${form.priorityType === PRIORITY_TYPES.EMERGENCY ? "priority-option--active" : ""}`}>
                <input
                  type="radio"
                  name="priorityType"
                  value={PRIORITY_TYPES.EMERGENCY}
                  checked={form.priorityType === PRIORITY_TYPES.EMERGENCY}
                  onChange={handleChange}
                />
                <span>🚨 Emergency</span>
              </label>
            </div>
            {errors.priorityType && <span className="error-text">{errors.priorityType}</span>}
          </div>
        </div>

        <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
          Register &amp; Get Token
        </button>
      </form>

      {registeredPatient && (
        <SuccessModal
          patient={registeredPatient}
          onClose={() => setRegisteredPatient(null)}
        />
      )}
    </>
  );
}
