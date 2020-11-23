import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import './alarm.css'

function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
          <ListItemIcon>
              <Checkbox
               
              />
            </ListItemIcon>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          alarm_time:'12:00',
          mon:'false',
          tues:'false',
          wed:'false',
          thu:'false',
          fri:'false',
          sat:'false',
          sun:'false',

        };
        this.onChange = this.onChange.bind(this);
        this.mon_onClick = this.mon_onClick .bind(this);
        this.tues_onClick = this.tues_onClick .bind(this);
        this.wed_onClick = this.wed_onClick .bind(this);
        this.thu_onClick = this.thu_onClick .bind(this);
        this.fri_onClick = this.fri_onClick .bind(this);
        this.sat_onClick = this.sat_onClick .bind(this);
        this.sun_onClick = this.sun_onClick .bind(this);

      }
      mon_onClick(e){

        if(this.state.mon===false){
            this.setState({mon:true});

        }
        else{
            this.setState({mon:false});

        }
     }
     tues_onClick(e){

        if(this.state.tues===false){
            this.setState({tues:true});

        }
        else{
            this.setState({tues:false});

        }
     }      
     wed_onClick(e){

        if(this.state.wed===false){
            this.setState({wed:true});

        }
        else{
            this.setState({wed:false});

        }
     }      
     thu_onClick(e){

        if(this.state.thu===false){
            this.setState({thu:true});

        }
        else{
            this.setState({thu:false});

        }
     }     
     fri_onClick(e){

        if(this.state.fri===false){
            this.setState({fri:true});

        }
        else{
            this.setState({fri:false});

        }
     }      
     sat_onClick(e){

        if(this.state.sat===false){
            this.setState({sat:true});

        }
        else{
            this.setState({sat:false});

        }
     }      
     sun_onClick(e){

        if(this.state.sun===false){
            this.setState({sun:true});

        }
        else{
            this.setState({sun:false});

        }
     }
      onChange(e) {
        this.setState({ alarm_time: e.target.value });
      }
    render(){
        const {onChange,mon_onClick, tues_onClick, wed_onClick, thu_onClick, fri_onClick, sat_onClick, sun_onClick } = this;

        return(
            <div className = "alarm">
                <Paper className = "alarm_paper" elevation={3}>
                <Typography className = "alarm_title" variant= "h6" align= "left">
                        Alarm
                    </Typography>
                    <Button className="Logout" >
                        Logout
                    </Button>
                    <div className ="week">
                        <Button className = "mon" variant="contained" onClick={mon_onClick} color={this.state.mon ? "gray" : "primary"}>
                            월
                        </Button>

                        <Button className = "tues" variant="contained" onClick={tues_onClick} color={this.state.tues ? "gray" : "primary"}>
                            화
                        </Button>

                        <Button className = "wed" variant="contained" onClick={wed_onClick} color={this.state.wed ? "gray" : "primary"}>
                            수
                        </Button>

                        <Button className = "thu" variant="contained" onClick={thu_onClick} color={this.state.thu ? "gray" : "primary"}>
                            목
                        </Button>

                        <Button className = "fri" variant="contained" onClick={fri_onClick} color={this.state.fri ? "gray" : "primary"}>
                            금
                        </Button>

                        <Button className = "sat" variant="contained" onClick={sat_onClick} color={this.state.sat ? "gray" : "primary"}>
                            토
                        </Button>

                        <Button className = "sun" variant="contained" onClick={sun_onClick} color={this.state.sun ? "gray" : "primary"}>
                            일
                        </Button>
                    </div>

                    <div className="alarm_list">
                    <FixedSizeList height={330} width={250} itemSize={46} itemCount={50}>
                   {renderRow}
                    </FixedSizeList>
                    </div>

                    <div className ="clock">
                        <TextField
                        id="time"
                        label="Alarm clock"
                        type="time"
                        defaultValue="00:00"
                        className="clock"
                        onChange={onChange}
                        
                        
                        />
                    </div>
                   <div className ="button_group">
                    <Button className = "add" variant="outlined">
                            추가                       
                    </Button>
                    <Button className = "add" variant="outlined">
                            삭제
                    </Button>
                    <Button className = "add" variant="outlined">
                            수정
                    </Button>
                   </div>
                    <div className ="warning">
                    <Typography className = "warning" variant= "h6" align= "center">
                        경고창
                    </Typography>
                    </div>
                </Paper>
            </div>

        )
    }
}

export default Alarm;