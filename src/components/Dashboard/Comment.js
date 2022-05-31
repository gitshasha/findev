import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import SideNav from "./SideNav";
import "draft-js/dist/Draft.css";
import "../../Styles/Comment.css";
import { EditorState, Editor, convertToRaw, convertFromRaw } from "draft-js";
import ProjectForm from "./ProjectForm";

function Comment() {
  let params = useParams();
  const [quest, setquest] = useState({});
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    ar_title: "",
    description: "",
  });
  const [encrypanswers, setencrypanswers] = useState([]);
  useEffect(() => {
    if (params.id) {
      axios
        .get(`http://localhost:3001/api/questions/${params.id}`)
        .then((data) => {
          setquest(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      const ansarray = [];
      axios
        .get(`http://localhost:3001/api/answers/${params.id}`)
        .then((data) => {
          console.log(data.data);
          data.data.map((data, ind) => {
            ansarray.push(JSON.parse(data.content));
          });
          setencrypanswers(ansarray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  encrypanswers &&
    encrypanswers.map((data, ind) => {
      console.log(data);
    });
  return (
    <div className="Comment">
      <div className="side">
        {" "}
        <SideNav />
      </div>

      <div className="answermid">
        <div className="answersearch">
          <input type="text" />
        </div>
        <div className="answerquestion">{quest.title}</div>
        <div className="answerpart">
          {encrypanswers &&
            encrypanswers.map((data, ind) => (
              <div key={ind} className="Eachcomment">
                <Editor
                  editorState={EditorState.createWithContent(
                    convertFromRaw({
                      blocks: data.blocks,
                      entityMap: data.entityMap,
                    })
                  )}
                  readOnly={true}
                />
              </div>
            ))}
        </div>
        <div className="commentedit">
          <ProjectForm QuestionId={params.id} />
        </div>
      </div>
    </div>
  );
}
function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
}
export default Comment;
