import React from "react";
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Score = () => (
    <div>
        <h6>Current Score: </h6>
        <h6>High Score: </h6>
    </div>
);

function Score(props) {

    return (
      <ReactCSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div>
          You prefer <strong>{props.gameResult}</strong>!
        </div>
      </ReactCSSTransitionGroup>
    );
  
  }
  
  Result.propTypes = {
    gameResult: React.PropTypes.string.isRequired,
  };


export default Score;