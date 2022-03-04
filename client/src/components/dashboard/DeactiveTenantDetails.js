import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deactiveTenantsDetails } from "../../actions/tenants";

const DeactiveTenantDetails = ({ tenants, deactiveTenantsDetails }) => {
  const [formData, setFormData] = useState({
    tenantdeactivereason: "",
    isSubmitted: false,
  });

  const { recordId, tenantstatus, tenantdeactivereason, isSubmitted } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (tenants, idx) => {
    const finalData = {
      recordId: tenants ? tenants._id : "",
      tenantstatus: "Deactive",
      tenantdeactivereason: tenantdeactivereason,
    };
    deactiveTenantsDetails(finalData);
    window.location.reload();
  };

  return (
    <Fragment>
      <div className="col-lg-12 col-md-9 col-sm-9 col-12 ">
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 ">
          <div className="col-lg-12 col-md-4 col-sm-4 col-12">
            <label>Reason For Deactivation:</label>
          </div>
          <div className="col-lg-12  col-md-4 col-sm-4 col-12">
            <textarea
              name="tenantdeactivereason"
              id="tenantdeactivereason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>
          <div className="col-lg-12 col-md-4 col-sm-4 col-12 py-2">
            <label>Are You Sure You Want to Deactivate??</label>
          </div>
          <div
            className="col-lg-12 col-md-9 col-sm-9 col-12 Savebutton"
            size="lg"
          >
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right "
              onClick={() => onSubmit(tenants)}
              style={
                tenantdeactivereason !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DeactiveTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveTenantsDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveTenantsDetails,
})(DeactiveTenantDetails);
