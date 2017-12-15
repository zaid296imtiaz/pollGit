import React, { Component } from 'react';
import firebase from 'firebase';
import { Nav } from './Polling';

class editPoll extends Component {
    constructor(props) {
        super(props)

        this.state = {
            qId: this.props.location.state.tkey,
            name: this.props.location.state.name,
            ques: this.props.location.state.ques,
            op1: this.props.location.state.op1,
            op2: this.props.location.state.op2,
            op3: this.props.location.state.op3,
            op4: this.props.location.state.op4,
            junk: 0
        }

    }

    componentWillMount(){
        this.thanks = 'hidden';
    }
    
    upp() {
        if (this.quesIn.value === undefined || this.op1In.value === undefined || this.op2In.value === undefined || this.nameIn.value === undefined) {
            alert('Please enter required fields')
        }
        else if(this.op3In.value === undefined && this.op4In.value !== undefined){
            var polls = {
                name: this.nameIn.value,
                ques: this.quesIn.value,
                op1: this.op1In.value,
                op2: this.op2In.value,
                op3: this.op4In.value,
                op4: ''
            }
        }
        else if(this.op3In.value === undefined && this.op4In.value === undefined){
            var polls = {
                name: this.nameIn.value,
                ques: this.quesIn.value,
                op1: this.op1In.value,
                op2: this.op2In.value,
                op3: '',
                op4: ''
            }
        }
        else if(this.op4In.value === undefined){
            var polls = {
                name: this.nameIn.value,
                ques: this.quesIn.value,
                op1: this.op1In.value,
                op2: this.op2In.value,
                op3: this.op3In.value,
                op4: ''
            }
        }
        else{
            var polls = {
                name: this.nameIn.value,
                ques: this.quesIn.value,
                op1: this.op1In.value,
                op2: this.op2In.value,
                op3: this.op3In.value,
                op4: this.op4In.value,
            }
        }

        firebase.database().ref('/').child("pollVote/" + this.state.qId).update(polls);
        console.log(polls);

        this.hide = 'none';
        this.thanks = 'visible';

        this.setState({junk: this.state.junk + 1})
    }

    render() {
        return (
            <div>
                <Nav />
                <div className='container col-9 p-3 rounded bg-light' style={{ borderLeft: '5px solid #3498DB', display: this.hide}}>
                    <div className='container mt-4'>
                        <h1 className='display-4 text-dark text-center'>Poll Edit</h1>
                        <p className='text-dark mb-2'>Edit Name:</p>
                        <textarea type="text" name='ques' ref={inp => this.nameIn = inp} defaultValue={this.state.name} className="form-control mb-3" onChange={this.submit} />
                        <p className='text-dark mb-2'>Edit Poll:</p>
                        <textarea type="text" name='ques' ref={inp => this.quesIn = inp} defaultValue={this.state.ques} className="form-control mb-3" onChange={this.submit} />
                        <div className='container'>
                            <p className='text-dark mb-2'>Edit Options:</p>
                            <input type="text" name='op1' ref={inp => this.op1In = inp} defaultValue={this.state.op1}  className="form-control mb-1" onChange={this.submit} />
                            <input type="text" name='op2' ref={inp => this.op2In = inp} defaultValue={this.state.op2}  className="form-control mb-1" onChange={this.submit} />
                            <input type="text" name='op3' ref={inp => this.op3In = inp} defaultValue={this.state.op3}  className="form-control mb-1" onChange={this.submit} />
                            <input type="text" name='op4' ref={inp => this.op4In = inp} defaultValue={this.state.op4}  className="form-control mb-3" onChange={this.submit} />
                            <center>
                                <button className='btn btn-info container col-7' onClick={this.upp.bind(this)}>Update</button>
                            </center>
                        </div>
                    </div>
                </div>
                <div class="alert alert-warning container" role="alert" style={{ visibility: this.thanks }}>
                    <h4 class="alert-heading">Success!</h4>
                    <p>Poll has been updated successfully. Go to the Homepage to see your updated poll</p>
                    <hr />
                    <p class="mb-0">Note: You can only edit untill it has zero votes.</p>
                </div>
            </div>
        )
    }
}

export default editPoll;