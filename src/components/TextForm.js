import React, { useRef, useState } from "react";

function TextForm(props) {
  const [text, setText] = useState(""); //array destructuring
  const textInputRef = useRef();
  const handleUpperClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","success");
  };

  const handleLowerClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase","success");
  };

  const handleClearText = () => {
    setText("");
    props.showAlert("Text Cleared","danger");
  }

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = () => {
    console.log(text);
    textInputRef.current.select();
    navigator.clipboard.writeText(textInputRef.current.value);
    props.showAlert("Copied to Clipboard","success");
  }

  const handleSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed","success");
  }

  const countWords = (str)=>{
    str = str.trim();
    if(str===""){
      return 0;
    }
    var words = str.split(/\s+/);
    return words.length;
  }

  return (
    <>
      <div className="container">
        <h1 style={{ color: props.mode === 'light' ? 'black' : 'white' }} >{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
            ref={textInputRef}
            style={{
              backgroundColor: props.mode === 'light' ? 'white' : '#adb5bd',
              color: props.mode === 'light' ? 'black' : '#000'
            }}
          ></textarea>
          <button className="btn btn-primary my-3" onClick={handleUpperClick}>
            Convert to Uppercase
          </button>

          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleLowerClick}
          >
            Convert to lowercase
          </button>

          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleClearText}
          >
            Clear Text
          </button>

          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleCopy}
          >
            Copy
          </button>
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleSpaces}
          >
            Remove Extra Spaces
          </button>
        </div>
      </div>
      <div className="container my-2" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
        <h2>Your Text Summary</h2>
        <p>
          {countWords(text)} words & {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length>0 ? text : "Enter your text to preview here"}</p>
      </div>
    </>
  );
}

export default TextForm;
