import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Button,Modal,Form,FormGroup,ControlLabel,HelpBlock,FormControl} from 'react-bootstrap';
import "./Mines.css";
class Mines extends Component {
  constructor(props){
    super(props);
    this.state = {
      minesnum:'',
      inputshow:false,
      minesdom:[],
      ismine:[],
      neiber:[]
    };
  }
  componentWillMount(){
    let ismine = this.state.ismine;
    let minesdom = this.state.minesdom;
    let neiber = this.state.neiber;
    var i = 0;
    for(i = 0;i<=39;i++){
      ismine[i] = new Array();
      minesdom[i] = new Array();
      neiber[i] = new Array();
      for(var j = 0;j<=39;j++){
        const mors = parseInt(Math.random()*3)==0?"mine":"safe";
        ismine[i][j] = mors;
        minesdom[i][j] = "safe";
        neiber[i][j] = '';
      }
    }
    this.setState({ismine:ismine});
  }
  getValidationState(){
    const value = this.state.minesnum;
    const reg = new RegExp("/^[5-9]$|^[2-3]\d$/");
    if (reg.test(value)) return 'success';
    else if(value < 5) return 'warning';
    else if(value > 39) return 'false';
  }
  handleChange = (e) =>{
    this.setState({ minesnum: e.target.value });
  }
  inputtg = (e) => {
    this.setState({inputshow:e,});
  }
  render(){
    let mors = this.state.ismine;
    let minesdom = this.state.minesdom;
    let maps = [];
    let values = this.state.minesnum;
    let neiber = this.state.neiber;
    for(var i = 0;i<values;i++){
      maps[i] = i;
      for(var j = 0;j<=values;j++){
      }
    }
    let width = document.body.clientWidth*0.95/values + "px";
    let style = {
      width:width,
      height:width,
    }
    let mines_click = (ei,ej) =>{
      let reg = new RegExp("^((?!safe).)*$");
      let ref = ei + ej;
      let eis = (parseInt(ei) -1) >= 0?(parseInt(ei) -1):ei;
      let ejs = (parseInt(ej) -1) >= 0?(parseInt(ej) -1):ej;
      let eik = (parseInt(ei) +1) < values?(parseInt(ei) +1):ei;
      let ejk = (parseInt(ej) +1) < values?(parseInt(ej) +1):ej;
      let reft = eis.toString() +ej;
      let refr = ei + ejk;
      let refb = eik  + ej;
      let refl = ei + ejs;
      let reftr = (ejk == ej?ei:eis).toString() + (eis == ei?ej:ejk).toString();
      let refbr = (ejk == ej?ei:eik).toString() + (eik == ei?ej:ejk).toString();
      let reftl = (ejs == ej?ei:eis).toString() + (eis == ei?ej:ejs).toString();
      let refbl = (ejs == ej?ei:eik).toString() + (eik == ei?ej:ejs).toString();
      let Mid = this.refs[ref].props.id;
      let Midt = this.refs[reft].props.id;
      let Midr = this.refs[refr].props.id;
      let Midb = this.refs[refb].props.id;
      let Midl = this.refs[refl].props.id;
      let Midtr = this.refs[reftr].props.id;
      let Midbr = this.refs[refbr].props.id;
      let Midtl = this.refs[reftl].props.id;
      let Midbl = this.refs[refbl].props.id;
      if(reg.test(Mid)){
        minesdom[ei][ej] = "mine";
        this.setState({minesdom:minesdom});
        alert("失败");
        return false;
      }else if(reg.test(Midt)||reg.test(Midr)||reg.test(Midb)||reg.test(Midl)||reg.test(Midbl)||reg.test(Midtl)||reg.test(Midtr)||reg.test(Midbr)){
        neiber[ei][ej] = 0;
        neiber[ei][ej] = reg.test(Midt)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midr)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midb)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midl)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midbr)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midtr)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midtl)?neiber[ei][ej]+1:neiber[ei][ej];
        neiber[ei][ej] = reg.test(Midbl)?neiber[ei][ej]+1:neiber[ei][ej];
        this.setState({neiber:neiber});
        return false;
      }else{
        neiber[ei][ej] = 0;
      }
      this.setState({neiber:neiber});
    }
    let mine_num = (ei,ej) =>{

    }
    return(
      <div>
        <Button onClick = {() => this.inputtg(true)}>
          自定义开始
        </Button>
          <Modal
            show={this.state.inputshow}
            onHide={() => this.inputtg(false)}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">React swapper</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>雷区大小</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.minesnum}
                    placeholder="雷区长宽"
                    onChange={this.handleChange}
                    />
                  <FormControl.Feedback />
                  <HelpBlock>请大于5，小于40</HelpBlock>
                </FormGroup>
                <Button bsStyle="primary" onClick = {() => this.inputtg(false)}>提交</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.inputtg(false)}>close</Button>
            </Modal.Footer>
          </Modal>
          <div className = "mines">
            {
              maps.map((index) => {
                return (
                  <p key = {index}>
                    {
                      maps.map(function(index1)
                      {
                        index = index.toString();
                        index1 = index1.toString();
                        return <Button style = {style} className = {minesdom[index][index1]} id = {index+index1+mors[index][index1]} onClick = {() => mines_click(index,index1)} key = {index + index1} ref = {index + index1}><h2>{neiber[index][index1]}</h2></Button>;
                      })
                    }
                  </p>
                )
              })
            }
          </div>
      </div>
    );
  }
}
export default Mines;
