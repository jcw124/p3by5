import React from 'react';

function QuestionCount(props) {

  return (
    <div className="questionCount">
      Question <span>{props.counter}</span> of <span>{props.total}</span>
    </div>
  );

  console.log("question count line 11" + props.counter);

}


export default QuestionCount;
