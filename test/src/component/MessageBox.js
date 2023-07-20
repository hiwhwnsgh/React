import React from "react";

function MessageBox(props) {
  if (!props.folding) return null;
  return (
    <>
      <div>message1</div>
      <div>message2</div>
      <div>message3</div>
      <div>...</div>
      <div>message10</div>
    </>
  );
}

export default MessageBox;