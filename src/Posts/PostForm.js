import React, { Component } from "react";

export default class PostForm extends Component {
  state = {
    title: "",
    body: ""
  };
  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };
  render() {
    const { title, body } = this.state;
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault;
          onSubmit({
            variables: {
              title,
              body
            }
          })
            .then(() => {
              this.setState({
                title: "",
                body: ""
              });
            })
            .catch(e => console.warn(e));
        }}
      >
        <input
          type="text"
          value={title}
          name="title"
          onChange={this.handleInput}
          placeholder="title"
        />
        <textarea
          type="text"
          value={body}
          name="body"
          onChange={this.handleInput}
          type="text"
          placeholder="body"
        />
        <button>Submit</button>
      </form>
    );
  }
}
