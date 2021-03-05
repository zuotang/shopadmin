import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// function imageHandler() {
//   const input = document.createElement("input");
//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();
//   input.onchange = async function () {
//     const file = input.files[0];
//     console.log("User trying to upload this:", file);

//     const formData = new FormData();
//     if (file !== null) {
//       formData.append("file", file);
//     }
//     fetch("https://smartquestionapi.advancity.net/image", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//       body: formData,
//     })
//       .then(function (response) {
//         if (response.ok) {
//           return response.json();
//         } else {
//           return { error: true, response: response.status, "rsponse: ": response.statusText };
//         }
//       })
//       .then((json) => {
//         console.log(json);
//         var cursorPosition = this.quill.getSelection();
//         var imagePath = "https://smartquestionapi.advancity.net/Images/" + json.imageUrl;
//         this.quill.insertEmbed(cursorPosition.index, "image", imagePath, Quill.sources.USER);
//         return json;
//       })
//       .catch((err) => {
//         console.log("eror: ", err);
//       });
//   }.bind(this);
// }

function App() {
  const [value, setValue] = useState("");
  let reactQuillRef = useRef();
  let modules = {
    toolbar: [
      ["bold", "italic", "underline"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      // [{ 'header': [1, 2, 3, false] }],
      // [{ 'font': [] }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={setValue}
        ref={(el) => {
          reactQuillRef = el;
        }}
      />
    </div>
  );
}

export default App;
