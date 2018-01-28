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


	ICONS = [
	              '',
	              jQuery('<img/>', { src: "/css/icons/chess-icons/wp.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/wn.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/wb.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/wr.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/wq.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/wk.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/bp.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/bn.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/bb.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/br.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/bq.png"  }),
	              jQuery('<img/>', { src: "/css/icons/chess-icons/bk.png"  })
	              ];	

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

	getFieldFigure(line : number, field : number){
		var fieldValue = INITIAL_BOARD[line][field];
		return ICONS[fieldValue];
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

  calculateSquareClass(fieldNumber){
  	var columnNumber = fieldNumber % 8;
  	var lineNumber = (fieldNumber-columnNumber) / 8;
  	return { line: lineNumber,column : columnNumber}
  }

  render() {
  	var squareClass = this.calculateSquareClass(this.props.value);
  	var squareCoordinates = this.calculateSquareCoordinates(this.props.value):
   	var boardRepresentation = this.props.boardRepresentation;

   	var fieldIcon = boardRepresentation.getFieldFigure(squareCoordinates.line, squareCoordinates.column);
    return (
      <td className={squareClass}>
        <img src={ require(fieldIcon) } />
      </td>
    );
  }
}

class BoardLine extends React.Component {
	render(){
		var fields = [];
		var startField = this.props.startField;
		var boardRepresentation = this.props.boardRepresentation;
		for(var i = 0;i<8;i++){
			fields.push(<Square value={startField + i} boardRepresentation={boardRepresentation}/>);
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
  	var lines = [];
  	var boardRep = this.props.boardRepresentation;
  	for(var i = 0;i<boardRep.getBoard().length;i++){
  		lines.push(<BoardLine startField={i*8} boardRepresentation={boardRep}/>);
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
