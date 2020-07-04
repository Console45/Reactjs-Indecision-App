import React, { Component } from "react";

export default class AddOption extends Component {
  state = {
    error: undefined,
  };
  handleAddOption = (e) => {
    e.preventDefault();
    const error = this.props.addOptionHandler(
      e.target.elements.option.value.trim()
    );
    this.setState(() => ({
      error,
    }));
    if (!error) e.target.elements.option.value = "";
  };
  render() {
    return (
      <div>
        {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
        <form className='add-option' onSubmit={this.handleAddOption}>
          <input className='add-option__input' name="option" />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}
