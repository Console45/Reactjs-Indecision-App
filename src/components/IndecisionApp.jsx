import React, { Component } from "react";
import AddOption from "./AddOption.jsx";
import Header from "./Header.jsx";
import Options from "./Options.jsx";
import Action from "./Action.jsx";
import OptionModal from "./OptionModal.jsx";

export default class IndecisionApp extends Component {
  state = {
    options: [],
    selectedOption: undefined,
  };
  handleDeleteOptions = () => {
    this.setState(() => ({
      options: [],
    }));
  };
  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option),
    }));
  };
  handlePick = () => {
    let random = Math.floor(Math.random() * this.state.options.length);
    let option = this.state.options[random];
    this.setState(() => {
      return {
        selectedOption: option,
      };
    });
  };
  handleClearSelectedOption = () => [
    this.setState(() => ({ selectedOption: undefined })),
  ];
  addOptionHandler = (option) => {
    if (!option) return "Enter a valid Value to add items";
    else if (this.state.options.includes(option))
      return "This option already exist";
    this.setState((prevState) => ({
      options: prevState.options.concat(option),
    }));
  };
  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) this.setState(() => ({ options }));
    } catch (err) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("saving data");
    }
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    const subtitle = "Put your life in the hands of a computer";
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption addOptionHandler={this.addOptionHandler} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}
