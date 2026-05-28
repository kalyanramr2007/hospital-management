import PatientForm from "../components/PatientForm";
import "./PageLayout.css";

export default function RegisterPage() {
  return (
    <div className="page container">
      <header className="page-header">
        <h1>Patient Registration</h1>
        <p>Register to receive your queue token. Fields marked with * are required.</p>
      </header>
      <div className="page-content page-content--narrow">
        <PatientForm />
      </div>
    </div>
  );
}
