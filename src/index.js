import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

/*
 * Rules of States:
 * Only usable with class components
 * Easy to confuse props with state
 * State is a JS onject that contains data relevant to a component
 * Updating state on most components will cause the component to rerender
 * State must be initialized when a component is first created (using constructor)
 * State can only be updated using the function 'setState'
 */

class App extends React.Component { 
    // constructor(props) {
    //     //Calling the super(props) is a reference to the parent's constructor function
    //     super(props);
    //     //THIS IS THE ONLY TIME we do direct assignment to this.state
    //     this.state = {  lat: null, errorMessage: '' };
    // }
    // Below line is equivalient to the constructor method and contents from above
    state = { lat: null, err: '' };
    /***
     * Lifecycle Methods
     * constructor is a good place to do one time setup
     * render method is just used to return JSX
     * componentDidMount is a good place to do data loading. Similar to constructor, but constructor is not meant for data loading
     * componentDidUpdate Good place to do more data loading when state/props change
     */

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position =>  this.setState({ lat: position.coords.latitude }), err => this.setState( { errorMessage: err.message })
        );
    }


    //Seperating our different options into a helper functions allows the render() to not have conditional logic
    renderContent(){
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />;
        }
        
        return <Spinner message="Please allow your location"/>
    }


    //React says we have to define render!!! 
    //Best to only have on return statement in render method
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.querySelector('#root'))