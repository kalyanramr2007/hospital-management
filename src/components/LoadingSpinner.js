import "./LoadingSpinner.css";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-spinner" role="status" aria-label={message}>
      <div className="spinner-ring" />
      <p>{message}</p>
    </div>
  );
}
