import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BoardRepresentation {

	WP = 1;
	WN = 2;
	WB = 3;
	WR = 4;
	WQ = 5;
	WK = 6;

	BP = 7;
	BN = 8;
	BB = 9;
	BR = 10;
	BQ = 11;
	BK = 12;

	INITIAL_BOARD = [
		                   [ BR, BN, BB, BQ, BK,  BB, BN, ],
		                   [ BP, BP,BP,BP,BP,BP,BP,BP],
		                   [0,0,0,0,0,0,0,0],
		                   [0,0,0,0,0,0,0,0],
		                   [0,0,0,0,0,0,0,0],
		                   [0,0,0,0,0,0,0,0],
		                   [ WP, WP,WP,WP,WP,WP,WP,WP],
		                   [ WR, WN, WB, WQ, WK,  WB, WN, WR],
		                  ];

	getBoard(){
		return INITIAL_BOARD;
	}		                  

	getLine(line : number){
		return INITIAL_BOARD[line];
	}

	getField(line : number, field : number){
		return INITIAL_BOARD[line][field];
	}

}

class Square extends React.Component {
  calculateSquareClass(fieldNumber){
  	var columnNumber = fieldNumber % 8;
  	var lineNumber = (fieldNumber-columnNumber) / 8;
  	if((lineNumber + columnNumber) % 2 === 0){
  		return "field black";
  	} else { 
  		return "field white";
  	}
  }

  render() {
  	var squareClass = this.calculateSquareClass(this.props.value);

    return (
      <td className={squareClass}>
        <img src={ require('./icons/chess-icons/bb.png') } />
      </td>
    );
  }
}

class BoardLine extends React.Component {
	render(){
		var fields = [];
		var startField = this.props.startField;
		for(var i = 0;i<8;i++){
			fields.push(<Square value={startField + i}/>);
		}
		return(
			<tr>
			{fields}
			</tr>
		);
	}
}

class Board extends React.Component {
  render() {
  	var boardRep = this.props.boardRepresentation;
  	for(var i = 0;i<boardRep.getBoard().length;i++){
  		lines.push(<BoardLine startField={i*8} boardLine={boardRep.getLine(i)}/>);
  	}
    return <table>{lines}</table>;
  }
}

class Game extends React.Component {
  render() {
  	var boardRepresentation = new BoardRepresentation();
    return (
      <div className="game">
        <div className="game-board">
          <Board boardRepresentation={boardRepresentation} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
