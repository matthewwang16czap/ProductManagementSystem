import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";

function Form({
  formName,
  formValidations,
  dispatchAction,
  submitButtonName,
  initialFormData,
  additionalFormData,
}) {
  const [formData, setFormData] = useState(
    Object.keys(formValidations).reduce((acc, field) => {
      acc[field] =
        initialFormData && initialFormData[field] ? initialFormData[field] : "";
      return acc;
    }, {})
  );
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get submit form values
    console.log(formData);
    if (e.target.checkValidity()) {
      console.log("Form is valid");
      // Submit the form
      dispatch(dispatchAction({...formData, ...additionalFormData}));
    } else {
      console.log("Form is invalid");
      formRef.current.className = "was-validated";
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-3">{formName}</h1>
      <form
        ref={formRef}
        className="needs-validation"
        onSubmit={handleSubmit}
        noValidate
      >
        {Object.entries(formValidations).map(([field, content]) => (
          <div key={field} className="row">
            <div className="col"></div>
            <div className="col-xs-10 col-sm-8 col-md-6">
              {content.type === "radio" && (
                <div className="mb-3">
                  <label
                    className="form-check-label me-3"
                    style={{ display: "block" }}
                  >
                    {content.label}
                  </label>
                  {content.selections.map((selection) => (
                    <div
                      key={selection}
                      className="form-check form-check-inline"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name={field}
                        id={selection}
                        value={selection}
                        checked={formData[field] === selection}
                        onChange={handleFormDataChange}
                        required={content.required ?? true}
                      />
                      <label className="form-check-label" htmlFor={selection}>
                        {selection}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {content.type === "textarea" && (
                <div className="form-floating has-validation mb-3">
                  <textarea
                    type={content.type}
                    className="form-control"
                    id={field}
                    name={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={handleFormDataChange}
                    pattern={content.pattern}
                    required={content.required ?? true}
                    style={{ height: content.height ?? "10em" }}
                  />
                  <label htmlFor={field}>{content.label}</label>
                  <div className="invalid-feedback">
                    {content.failedMessage}
                  </div>
                </div>
              )}
              {!["radio", "textarea"].includes(content.type) && (
                <div className="form-floating has-validation mb-3">
                  <input
                    type={content.type}
                    className="form-control"
                    id={field}
                    name={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={handleFormDataChange}
                    pattern={content.pattern}
                    min={content.min}
                    step={content.step}
                    required={content.required ?? true}
                  />
                  <label htmlFor={field}>{content.label}</label>
                  <div className="invalid-feedback">
                    {content.failedMessage}
                  </div>
                </div>
              )}
            </div>
            <div className="col"></div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          {submitButtonName ?? "Submit"}
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  formValidations: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      pattern: PropTypes.string,
      failedMessage: PropTypes.string,
      selections: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  dispatchAction: PropTypes.func,
  submitButtonName: PropTypes.string,
  initialFormData: PropTypes.object,
  additionalFormData: PropTypes.object,
};

export default Form;
