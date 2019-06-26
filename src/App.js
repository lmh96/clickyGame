import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      winCondition: false,
    }
  }

  componentWillMount() {
    let btns = [];
    for (let i = 0; i < 24; i++) {
      btns.push({ text: i, clicked: false });
    }

    //SHUFFLE BTNS HERE
    btns = this.shuffle(btns);

    this.setState({
      buttons: btns,
    });
  }

  clickIt = event => {
    let text = event.target.dataset.text;
    let clicked = event.target.dataset.clicked;
    let btns = this.state.buttons;

    if (clicked === true || clicked === "true") {
      alert("Oops, you already clicked that one! start over!");
      let btns = [];

      for (let i = 0; i < 24; i++) {
        btns.push({ text: i, clicked: false });
      }

      //SHUFFLE BTNS HERE
      btns = this.shuffle(btns);

      this.setState({
        buttons: btns,
      });
    }
    else {
      for (let i = 0; i < btns.length; i++) {
        if (this.state.buttons[i].text.toString() === text.toString()) {
          btns[i].clicked = true;
        }
      }

      //SHUFFLE BTNS HERE
      btns = this.shuffle(btns);

      let winCondition = true;
      for(let i = 0; i < btns.length; i++) {
        if(btns[i].clicked === false || btns[i].clicked === "false") {
          winCondition = false;
        }
      }

      if(winCondition) {
        alert("You won!");
        this.setState({
          buttons: [],
          winCondition: true,
        });
      }
      else {
        this.setState({
          buttons: btns,
        });
      }
    }
  }

  shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let x = arr[i];
      let y = arr[j];

      arr[i] = y;
      arr[j] = x;
    }

    return arr;
  }

  render() {
    return (
      <div className="App">
        <h1>This is a clicky game, have fun I guess</h1>
        <div className="theGrid">
          {
            this.state.buttons.map(button => (
              <button onClick={this.clickIt} className={"clicky"} data-text={button.text} data-clicked={button.clicked}>{button.text}</button>
            ))
          }
          {
            this.state.winCondition ? <h1>You Won! refresh the page to play again!</h1> : null
          }
        </div>
      </div>
    );
  }

}

export default App;
