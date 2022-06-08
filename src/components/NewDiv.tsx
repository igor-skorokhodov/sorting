import React from "react";
import "../components/NewDiv.css";

interface cell {
  currentNumber?: number; //значение ячейки
  beginX: number; // left ячейки
  beginY: number; // top ячейки
  endX?: number; //конечная точка рамки по оси Х
  endY?: number; //конечная точка рамки по оси Y
  width?: number; //ширина рамки
  height?: number; //высота рамки
  isUnderline?: boolean; 
  pos?: number;// признак выделенности ячейки стиль
}

interface IFieldProps {}

interface IFieldState {
  isClicked?: boolean; //флаг клика
  downActive: boolean; //флаг нажатия на ячейку
  cells: cell[];
  Compare: {LESS_THAN: -1,
    BIGGER_THAN: 1} //массив ячеек
}

export default class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      isClicked: false,
      downActive: false,
      cells: [],
      Compare: {
        LESS_THAN: -1,
        BIGGER_THAN: 1
      },
    };


  }
  rendering() {
    let array = [];
    for (let i = 0; i < 15; i ++) {
       array[i] = {
        currentNumber: Math.floor(Math.random() * 100),
        beginX: (i*50)+300,
        beginY: 200,
        width: 20,
        height: 20,
        pos: i
       }
    }
    this.setState({cells: array})
    console.log(this.state.cells)
  }

  changePlace() {
    let arr =  this.bubbleSort(this.state.cells)
    this.setState({cells: arr})
    console.log(this.state.cells)
  }


bubbleSort(arr: any) {

  for (let i = 0; i < arr.length; i++) {
      for (let j = i+1; j < arr.length ; j++) { // refer to note below
          if (arr[i].currentNumber > arr[j].currentNumber) {
            console.log('da')
            console.log(arr[i], arr[j])
            let a = arr[i];
            arr[i] = arr[j];
            arr[j] = a;
            console.log(arr[i], arr[j])
      }
      else {
        console.log('net')
        this.setState({cells: arr})
      }
  }
  console.log(arr)
  this.setState({cells: arr})
  return arr;
}}

  componentDidMount() {
    console.log(this.state.cells)
    this.rendering()
  }

  



 
  render() {
 
    return (
      <>
        <div className="NewDiv">
          <header className="App-header">
            <p>Сортировка массива</p>
            
          </header>
          <div
            className="field"
          ><button className="button" onClick={this.changePlace.bind(this)}>Поменять местами</button>
            {this.state.cells.map((cell, i) => {
              return ( <>
              <div className="element" style={{
                      position: "absolute",
                      top:
                          cell.beginY,
                      left:
                          cell.beginX,
                      width: cell.width,
                      height: cell.height,
                    }}>{cell.currentNumber}</div>
              </>
              )
            })}
          </div>
        </div>
      </>
    );
  }
}
