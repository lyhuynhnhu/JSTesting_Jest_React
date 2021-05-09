import React from 'react';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { validationRules, validateValuesByRule } from '../../utils/validation';
import spinnerIcon  from '../../assets/images/spinner-icon.png';

import './Contact.scss';

const options = [
  {
    id: 0,
    label: "Enter type user",
    value: "type",
  },
  {
    id: 1,
    label: "Rider",
    value: "rider",
  },
  {
    id: 2,
    label: "Driver",
    value: "driver",
  }
];

const Contact = () => {
  const formik = useFormik({
      initialValues: {
          name: '',
          typeUser: '',
          message: ''
      },
      validate: (values) => {
          return validateValuesByRule({
              name: validationRules.required,
              typeUser: validationRules.typeUser,
              message: validationRules.required
          })(values);
      },
      onSubmit: (values, actions) => {
          setTimeout(() => {
              actions.setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
          }, 2000)
      },
  });

  return (
    <div className="contact-form">
      <form method="post" data-testid="contact-form" className="form-horizontal" onSubmit={formik.handleSubmit}>
        <div className="contact-title">
          <FontAwesomeIcon icon={faEnvelope} size="sm" className="icon-envelop" />
          <p className="contact-us">Contact us</p>
        </div>
        <div className="content">
          <div className="left-field">
            <div className={classNames({
              'form-group': true,
              'has-error': formik.touched.name && formik.errors.name
            })}>
              <label htmlFor="name" className="label-control">Your name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                className="name-control form-control"
                placeholder="Enter the issue"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />
            </div>
            {formik.touched.name && formik.errors.name && (
              <span data-testid="error" className="error-control">
                {formik.errors.name}
              </span>
            )}

            <div className={classNames({
              'form-group': true,
              'has-error': formik.touched.typeUser && formik.errors.typeUser
            })}>
              <label htmlFor="typeUser" className="label-control">Select:</label>
              <select
                id="typeUser"
                name="typeUser"
                value={formik.values.typeUser}
                className="select-control form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            {formik.touched.typeUser && formik.errors.typeUser && (
              <span className="error-control">
                {formik.errors.typeUser}
              </span>
            )}
          </div>
          <div className="right-field">
              <div className={classNames({
                'form-group': true,
                'has-error': formik.touched.message && formik.errors.message
              })}>
                <label htmlFor="message" className="label-control" style={{verticalAlign:"top"}}>Message:</label>
                <textarea
                  type="text"
                  id="message"
                  name="message"
                  value={formik.values.message}
                  className="msg-control form-control"
                  placeholder="Enter your message"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} />
              </div>
              {formik.touched.message && formik.errors.message && (
                <span className="error-control">
                  {formik.errors.message}
                </span>
              )}
          </div>
        </div>
        <div>
          <button 
            type="submit" 
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            className="btn-control">
            {formik.isSubmitting ? 
            <img src={spinnerIcon} className="spinner-icon" alt="spinner-icon" /> :
            <FontAwesomeIcon icon={faArrowRight} size="2x" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
