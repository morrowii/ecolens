import React from "react";
import axios from "axios";
import SpeciesFamily from "./SpeciesFamily.js";

class Inventory extends React.Component {

  state = {
    siteID: 1,
    studyYear: 2017,
    inventoryList: []
  }

  async componentDidMount() {
    await axios.get('/flora/inventory/list/retrieve').then(res => {
      this.setState({ inventoryList: res.data });
    });
  }

  handleSpeciesCheck = event => {
    let isChecked = event.target.checked;
    let checkedSpeciesID = event.target.id;
    switch (isChecked) {
      case true:
        axios.post('/flora/inventory/observation', {
          siteID: this.state.siteID,
          studyYear: this.state.studyYear,
          speciesID: checkedSpeciesID
        });
        break;
      case false:
        axios.delete('/flora/inventory/correction', {

        });
        break;
    }
  }

  render() {
    return (
      <div className="container-fluid inventory">

        <div className="row m-5">
          <div className="col">
            <h1>Flora Inventory</h1>
          </div>
        </div>

        <div className="row m-5">
          <div className="col">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text bg-success text-white" id="inputGroup-sizing-lg">Search Flora</span>
              </div>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"></input>
            </div>
          </div>
        </div>

        <div className="row m-5">
          <div className="col">
            <div id="accordion">
              {
                this.state.inventoryList.map(family => {
                  return <SpeciesFamily family={family} key={family[0]} handleSpeciesCheck={this.handleSpeciesCheck} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;