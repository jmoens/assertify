import React, { Component } from 'react';
import './Styles.css'
import { LineChart } from 'react-charts-d3';

class Profile extends Component {
    state ={
        fullName:"Lisa",
        userName: "lisa1234",
        email:"lisa@email.com",
        statsLabel: "Show Statistics",
        json: ""
    }

    onClick = (e) => {
        if(this.state.statsLabel === "Show Statistics"){
            const xhr = new XMLHttpRequest();

            const url = "http://127.0.0.1:8080/stats/" + localStorage.getItem("sid");

            xhr.open('GET', url);

            xhr.send();

            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4) {
                    let json = JSON.parse(xhr.responseText);
                    console.log(json);
                    console.log(json["tones"]);
                    console.log(json["words"]);
                    this.setState({
                        json: json,
                        statsLabel: "Hide Statistics"
                    });
                }
            }
        } else {
            this.setState({
                statsLabel: "Show Statistics"
            });
        }
    }

    render() {
        let toneStatistics = <div/>
        let wordStatistics = <div/>
        if(this.state.statsLabel === "Hide Statistics"){
            if(this.state.json['tones'].length > 0){
                let config = { 
                    showXAxis: true, 
                    showXAxisLabel: true, 
                    xLabel: 'Trial', 
                    xLabelPosition: 'center', 
                    showYAxis: true, 
                    showYAxisLabel: true, 
                    yLabel: 'Count', 
                    yLabelPosition: 'middle'}
                toneStatistics = <div className="center bottom-buffer">Tones<LineChart axisConfig={config} data={this.state.json['tones']} /></div>
            } else {
                toneStatistics = <div>No Statistics to Show</div>
            }
            if(this.state.json['words'].length > 0) {
                let config = { 
                    showXAxis: true, 
                    showXAxisLabel: true, 
                    xLabel: 'Trial', 
                    xLabelPosition: 'center', 
                    showYAxis: true, 
                    showYAxisLabel: true, 
                    yLabel: 'Count', 
                    yLabelPosition: 'middle'}
                wordStatistics = <div className="center">Word Count<LineChart axisConfig={config} data={this.state.json['words']} /></div>
            }
            
        }
        return(
            <div className="container">
                
                <div>
                    <h4 className="center-align">Profile</h4>
                    <div className="card underline darkYellow"></div>
                    <p>
                        <span className="bold">Name:</span> {this.state.fullName}
                    </p>
                    <p>
                    <span className="bold">UserName:</span> {this.state.userName}
                    </p>
                    <p>
                    <span className="bold">Email:</span>  {this.state.email}
                    </p>
                    <div className="center-align bottom-buffer">
                        <a className="waves-effect btn mediumGold black-text" onClick={this.onClick}>
                            <i className="material-icons left">insert_chart</i>
                            {this.state.statsLabel}
                        </a>
                    </div>
                    {toneStatistics}
                    {wordStatistics}
                </div>
            </div>
        )
    }
}

export default Profile;
