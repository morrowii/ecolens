import React from "react";
import Species from "./Species.js";

class SpeciesFamily extends React.Component {

  render() {
    return (
        <div className="card m-1">
          <div className="card-header bg-success" id={this.props.family[1]+"heading"}>
            <button className="btn btn-success w-100" data-toggle="collapse" data-target={"#"+this.props.family[1]} aria-expanded="true" aria-controls={this.props.family[1]}>
              {this.props.family[1]}
            </button>
          </div>

          <div id={this.props.family[1]} className="collapse hide" aria-labelledby={this.props.family[1]+"heading"} data-parent="#accordion">
            <div className="card-body d-flex flex-column">
              {
                this.props.family[2].map(species => {
                  return <Species species={species} key={species[0]} handleSpeciesCheck={this.props.handleSpeciesCheck} />
                })
              }
            </div>
          </div>
        </div>
    )
  }
}

export default SpeciesFamily;