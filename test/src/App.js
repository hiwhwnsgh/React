
import React, { useState } from "react";
import "./index.css";
import FileInput from './component/fileInput'

function App() {
  const [fileReaderThumbnail, setFileReaderThumbnail] = useState();
  const [URLThumbnail, setURLThumbnail] = useState();
  const [image,setImage] = useState();
  const img ='defaultImage.png';
  const data = React.lazy(()=> import('./img/defaultImage.png'));
  
  const onClick = async()=>{
    const name = 'e32bbd70-1867-4fa5-acac-42d1560292a5';
    const response = (await import(`./img/${name}.png`)).default;
    setImage(response);
  }
  const encodeFile = (fileBlob) => { // FileReader 방식
    const reader = new FileReader();

    if (!fileBlob) return;

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        const result = reader.result;

        setFileReaderThumbnail(result);

        resolve();
      };
    });
  };

  const createImageURL = (fileBlob) => {  // createObjectURL 방식
    if (URLThumbnail) URL.revokeObjectURL(URLThumbnail);

    const url = URL.createObjectURL(fileBlob);
    setURLThumbnail(url);
  };

  const onFileReaderChange = (e) => {
    const { files } = e.target;

    if (!files || !files[0]) return;

    const uploadImage = files[0];

    encodeFile(uploadImage);
  };

  const onImageChange = (e) => {
    const { files } = e.target;

    if (!files || !files[0]) return;

    const uploadImage = files[0];
    let data = new Uint8Array(uploadImage);
    console.log(data);
    createImageURL(uploadImage);
  };

  return (
    <div className="main">
      <div className="section">
        <h1>File Input by FileReader</h1>
        <div className="image-wrapper">
          {fileReaderThumbnail ? (
            <img src={fileReaderThumbnail} alt="img" />
          ) : (
            "이미지 미리보기"
          )}
        </div>
        <FileInput label="File Reader Upload" onChange={onFileReaderChange} />
      </div>
      <div className="section">
        <h1>File Input by createObjectURL</h1>
        <div className="image-wrapper">
          <img src={image} alt="thumbnail" />

        </div>
        <FileInput label="create object URL Upload" onChange={onImageChange} />
      </div>
      <div>
      <button onClick={onClick}>이미지</button>
      </div>
    </div>
  );
}

export default App;