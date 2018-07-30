import React, { Component } from "react";
import EnterGameQA from "./EnterGameQA";
import { DisplayGameQA, DisplayGameQAItem } from "./DisplayGameQA";

class App extends Component {
    render() {
        return(
            <div>
                <EnterGameQA />
                <DisplayGameQA>
                    <DisplayGameQAItem />
                </DisplayGameQA>
                <button type="submit" type="submit" className="btn btn-primary">Done</button>
            </div>
        )
    }
}

export default App;
