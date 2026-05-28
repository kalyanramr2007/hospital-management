export function validatePatientForm(form) {
  const errors = {};

  if (!form.patientName?.trim()) {
    errors.patientName = "Patient name is required";
  } else if (form.patientName.trim().length < 2) {
    errors.patientName = "Name must be at least 2 characters";
  }

  const age = Number(form.age);
  if (!form.age && form.age !== 0) {
    errors.age = "Age is required";
  } else if (isNaN(age) || age < 0 || age > 150) {
    errors.age = "Enter a valid age (0–150)";
  }

  if (!form.gender) {
    errors.gender = "Please select gender";
  }

  const mobile = form.mobile?.replace(/\s/g, "");
  if (!mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[0-9]{10}$/.test(mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }

  if (!form.symptoms?.trim()) {
    errors.symptoms = "Please describe symptoms";
  }

  if (!form.priorityType) {
    errors.priorityType = "Select priority type";
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
