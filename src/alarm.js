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
          alarm_time:'',

        };
        this.onChange = this.onChange.bind(this);
      
      }
      onChange(value) {
        this.setState({ alarm_time: value });
      }
    render(){
        const { onChange } = this;

        return(
            <div className = "alarm">
                <Paper className = "alarm_paper" elevation={3}>
                <Typography className = "alarm_title" variant= "h6" align= "left">
                        Alarm
                    </Typography>
                    <Button className="Logout">
                        Logout
                    </Button>
                    <div className ="week">
                        <Button className = "monday" variant="outlined">
                            월
                        </Button>

                        <Button className = "monday" variant="outlined">
                            화
                        </Button>

                        <Button className = "monday" variant="outlined">
                            수
                        </Button>

                        <Button className = "monday" variant="outlined">
                            목
                        </Button>

                        <Button className = "monday" variant="outlined">
                            금
                        </Button>

                        <Button className = "monday" variant="outlined">
                            토
                        </Button>

                        <Button className = "monday" variant="outlined">
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
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={onchange}
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
                        경고창{this.state.alarm_time}
                    </Typography>
                    </div>
                </Paper>
            </div>

        )
    }
}

export default Alarm;