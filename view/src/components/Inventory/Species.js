import React from "react";
import "./Inventory.css";

class Species extends React.Component {

  render() {
    return (
      <div className="form-check">
        <form>
          <div className="form-row">
            <div className="col"></div>
            <div className="col-lg-8 col-md-8 col-sm-4 py-2">
              <label className="form-check-label" htmlFor={this.props.species[1]}>{this.props.species[1]}</label>
            </div>
            <div className="col-1 py-2">
              <input className="form-check-input" type="checkbox" value="" id={this.props.species[0]} onChange={this.props.handleSpeciesCheck} />
            </div>
            <div className="col"></div>
          </div>
        </form>
      </div>
    );
  }
}

export default Species;