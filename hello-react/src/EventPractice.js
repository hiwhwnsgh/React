import { Component } from "react";

class EventPractice extends Component {
  state = {
    username: "",
    message: "",
  };
  handleChage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleClick = () => {
    alert(this.state.username + ":" + this.state.message);
    this.setState({
      username: "",
      message: "",
    });
  };
  handleKeyPress = e =>{
    if(e.key === 'Enter'){
        this.handleClick();
    }
  }
  render() {
    return (
      <div>
        <h1>이벤트연습</h1>
        <input
          type="text"
          name="username"
          placeholder="아무거나 입력해 보세요"
          value={this.state.username}
          onChange={this.handleChage}
        ></input>
        <br />
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChage}
          onKeyPress={this.handleKeyPress}
        ></input>
        <br />

        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
