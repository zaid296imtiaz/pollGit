import React, { Component } from 'react';
import firebase from 'firebase';
import { Nav } from './Polling';

class showPoll extends Component {
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
            totalVotes: this.props.location.state.totalVotes,
            op1Votes: this.props.location.state.op1Votes,
            op2Votes: this.props.location.state.op2Votes,
            op3Votes: this.props.location.state.op3Votes,
            op4Votes: this.props.location.state.op4Votes,
            editCheck: this.props.location.state.editCheck,
            r1: false,
            r2: false,
        }

        this.Display = this.Display.bind(this);

        firebase.database().ref('/').child('pollVote/' + this.state.qId).on('value', snap => {
            var obj1 = snap.val();

            if (obj1 == null) { }
            else {
                this.setState({
                    totalVotes: obj1.totalVotes,
                    op1Votes: obj1.op1Votes,
                    op2Votes: obj1.op2Votes,
                    op3Votes: obj1.op3Votes,
                    op4Votes: obj1.op4Votes,
                })
            }
        })

    }

    componentWillMount() {
        this.Display();
        this.thanks = 'hidden';
    }

    Display(props) {

        if (this.state.op3 === '' && this.state.op4 !== '') {
            this.hideClass2 = 'none';
            this.setState({
                qId: this.props.location.state.tkey,
                name: this.props.location.state.name,
                ques: this.props.location.state.ques,
                op1: this.props.location.state.op1,
                op2: this.props.location.state.op2,
                op3: this.props.location.state.op4,
                totalVotes: this.props.location.state.totalVotes,
                op1Votes: this.props.location.state.op1Votes,
                op2Votes: this.props.location.state.op2Votes,
                op3Votes: this.props.location.state.op3Votes,
                op4Votes: this.props.location.state.op4Votes,
            })
        }
        else if (this.state.op4 === '' && this.state.op3 !== '') {
            this.hideClass2 = 'none';
            this.setState({
                qId: this.props.location.state.tkey,
                name: this.props.location.state.name,
                ques: this.props.location.state.ques,
                op1: this.props.location.state.op1,
                op2: this.props.location.state.op2,
                op3: this.props.location.state.op3,
                totalVotes: this.props.location.state.totalVotes,
                op1Votes: this.props.location.state.op1Votes,
                op2Votes: this.props.location.state.op2Votes,
                op3Votes: this.props.location.state.op3Votes,
                op4Votes: this.props.location.state.op4Votes,
            })
        }
        else if (this.state.op3 === '' && this.state.op4 === '') {
            this.hideClass = 'none';
            this.hideClass2 = 'none';
            this.setState({
                qId: this.props.location.state.tkey,
                name: this.props.location.state.name,
                ques: this.props.location.state.ques,
                op1: this.props.location.state.op1,
                op2: this.props.location.state.op2,
                totalVotes: this.props.location.state.totalVotes,
                op1Votes: this.props.location.state.op1Votes,
                op2Votes: this.props.location.state.op2Votes,
                op3Votes: this.props.location.state.op3Votes,
                op4Votes: this.props.location.state.op4Votes,
            })
        }
        else {
            this.setState({
                qId: this.props.location.state.tkey,
                name: this.props.location.state.name,
                ques: this.props.location.state.ques,
                op1: this.props.location.state.op1,
                op2: this.props.location.state.op2,
                op3: this.props.location.state.op3,
                op4: this.props.location.state.op4,
                totalVotes: this.props.location.state.totalVotes,
                op1Votes: this.props.location.state.op1Votes,
                op2Votes: this.props.location.state.op2Votes,
                op3Votes: this.props.location.state.op3Votes,
                op4Votes: this.props.location.state.op4Votes,
            })
        }
    }

    voteMade(ev) {

        this.hide = 'none';
        this.thanks = 'visible';

        if (ev.target.name === 'op1') {
            firebase.database().ref('/').child("pollVote/" + this.state.qId).update({ op1Votes: this.state.op1Votes + 1, editCheck: true, totalVotes: this.state.totalVotes + 1 });
        }
        else if (ev.target.name === 'op2') {
            firebase.database().ref('/').child("pollVote/" + this.state.qId).update({ op2Votes: this.state.op2Votes + 1, editCheck: true, totalVotes: this.state.totalVotes + 1 });
        }
        else if (ev.target.name === 'op3') {
            firebase.database().ref('/').child("pollVote/" + this.state.qId).update({ op3Votes: this.state.op3Votes + 1, editCheck: true, totalVotes: this.state.totalVotes + 1 });
        }
        else if (ev.target.name === 'op4') {
            firebase.database().ref('/').child("pollVote/" + this.state.qId).update({ op4Votes: this.state.op4Votes + 1, editCheck: true, totalVotes: this.state.totalVotes + 1 });
        }
        firebase.database().ref('/').child('pollVote/' + this.state.qId).on('value', snap => {
            var op1V, op2V, op3V, op4V, opT;
            var votesObj = snap.val();

            if (votesObj == null) { }
            else {
                op1V = votesObj.op1Votes;
                op2V = votesObj.op2Votes;
                op3V = votesObj.op3Votes;
                op4V = votesObj.op4Votes;
                opT = votesObj.totalVotes;
            }

            console.log('Option 1 votes: ' + op1V / opT * 100 + '%')
            console.log('Option 2 votes: ' + op2V / opT * 100 + '%')
            console.log('Option 3 votes: ' + op3V / opT * 100 + '%')
            console.log('Option 4 votes: ' + op4V / opT * 100 + '%')
            console.log('Total votes: ' + opT)
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="alert alert-warning container alert-dismissible fade show" role="alert">
                    <strong>To keep voting Annonymous results will not be displayed.</strong> However as this is an assignment, you can open console to see the results .
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className='container col-9 p-3 rounded bg-white' style={{ borderLeft: '5px solid #1B4F72', display: this.hide }}>
                    <h2 className='text-dark mb-1'>Poll Name:</h2>
                    <p className='p p-3 bg-light mb-2 rounded'>{this.state.name}</p>
                    <h2 className='text-dark mb-1'>Poll:</h2>
                    <p className='p p-3 bg-light mb-2 rounded'>{this.state.ques}</p>
                    <div className='container mt-4'>
                        <h4 className='text-dark mb-1'>Voting options:</h4>
                        <button ref='op1ref' name='op1' className='btn btn-outline-info mb-2 text-left mr-1 col-5' onClick={this.voteMade.bind(this)}>{this.state.op1}</button>
                        <button ref='op2ref' name='op2' className='btn btn-outline-info mb-2 text-left ml-1 col-5' onClick={this.voteMade.bind(this)}>{this.state.op2}</button>
                        <button ref='op3ref' name='op3' style={{ display: this.hideClass }} className='btn btn-outline-info mb-2 text-left mr-1 col-5' onClick={this.voteMade.bind(this)}>{this.state.op3}</button>
                        <button ref='op4ref' name='op4' style={{ display: this.hideClass2 }} className='btn btn-outline-info hideClass2 mb-2 text-left ml-1 col-5' onClick={this.voteMade.bind(this)}>{this.state.op4}</button>
                    </div>
                </div>

                <div class="alert alert-success container" role="alert" style={{ visibility: this.thanks }}>
                    <h4 class="alert-heading">Thank you!</h4>
                    <p>Thanks for your participation. Your vote has successfully recorded.</p>
                    <hr />
                    <p class="mb-0">You can check other polls or create one of your own.</p>
                </div>
            </div>

        )
    }
}

export default showPoll;