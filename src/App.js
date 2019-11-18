import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
          constructor(props){
              super(props);
              this.state ={
                  usd: 2.05,
                  eur: 2.26,
                  rub: 0.033,
                  byn: 1,
                  from: 'byn',
                  to: 'usd',
                  value:0,
                  sum: 0,
                  date: new Date().toLocaleDateString()
              }
          }
    
        componentDidMount(){
            axios
            .get("http://www.nbrb.by/API/ExRates/Rates?Periodicity=0")
            .then(data=>{
                let usd = data.data.filter(elem=>elem.Cur_Abbreviation==='USD')[0].Cur_OfficialRate;
                let eur = data.data.filter(elem=>elem.Cur_Abbreviation==='EUR')[0].Cur_OfficialRate;
                let rub = data.data.filter(elem=>elem.Cur_Abbreviation==='RUB')[0].Cur_OfficialRate;
                this.setState({usd, eur, rub: rub/100 })
            })
        }
            
         startInput=()=>{
            this.setState({value:''}) 
         }
          
          handleSelect=(e)=>{
              let value = e.target.value;
              let id = e.target.id;
              this.setState({[id]: value}, this.calculate);
        }
          
          
          calculate=(e)=>{
              let count;
              if(e){
                  count = +e.target.value;
              } else
                count = this.state.value;
              let sum = (this.state[this.state.from]*count/this.state[this.state.to]).toFixed(2);
              this.setState({value: count, sum });  
          }
                    
          render(){
              return (
                <div className="App">
                    <h1>Exchange rates {this.state.date}</h1>
                    <div className="converter">
                       <input type="number" onClick={this.startInput} onChange={this.calculate}  value={this.state.value}  />
                   
                    <select id="from" onChange={this.handleSelect} value={this.state.from}>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="rub">RUB</option>
                        <option value="byn">BYN</option>
                    </select>
                    <select id="to" onChange={this.handleSelect} value={this.state.to}>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="rub">RUB</option>
                        <option value="byn">BYN</option>
                    </select>
                    <p>{  this.state.value==='' ? 0 : this.state.value}                {(this.state.from).toUpperCase()} is { this.state.value===''? 0 :this.state.sum} {(this.state.to).toUpperCase()} 
                    </p>
                  </div>
                </div>    
              )
          }
      }

export default App;
