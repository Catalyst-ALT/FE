import { useState } from "react";
import axios from "axios";
import data from "/prompt.json";
import MovementPrompt from "../promptresponse/movementprompt.jsx";
import {useNavigate} from 'react-router-dom';
import ParameterComponent from "../parameters/ParameterComponent.jsx";
import MediumNav from "../parameters/MediumNav.jsx"; 

const Movement = ({ setOutput, output, setMovementGenerativeSpace }) => {
    const [movementSomatics, setMovementSomatics] = useState("");
    const [movementThemes, setMovementThemes] = useState("");
    const [emotion, setEmotion] = useState("");
    const [postId, setPostId] = useState(null);
    const [sentiment, setSentiment] = useState("");
    const [promptLength, setPromptLength] = useState("");
    const [activeElement, setActiveElement] = useState("movementSomatics");
    const [generateButton, setGenerateButton] = useState(false);
    const [beginButtonVisible, setBeginButtonVisible] = useState(false);
    const initialNavDataValues = [
        {
            title: "Somatics",
            isActive: true,
        },
        {
            title: "Themes", 
            isActive: false,
        },
        {
            title: "Emotion",
            isActive: false,
        },
        {
            title: "Sentiment",
            isActive: false,
        },
    ];
    const [navData, setNavData] = useState(initialNavDataValues);

    const handlePost = (e) => {
        e.preventDefault();
        axios
        .post('https://catalyst-x226.onrender.com/api/movement/generate/',{
            somatic: movementSomatics,
            theme: movementThemes,
            sentiment: sentiment,
            emotion: emotion,
            prompt_length: promptLength,
        })
        .then((response) => {
            console.log(response.data);
            setPostId(response.data.id);
            setBeginButtonVisible(true);
        })}

    const handleMovementSomatics = (selectedMovementSomatics) => {
        setMovementSomatics(selectedMovementSomatics);
        console.log(selectedMovementSomatics)
    }
    
    const handleMovementThemes = (selectedMovementThemes) => {
        setMovementThemes(selectedMovementThemes);
        console.log(selectedMovementThemes)
    }

    const handleEmotionChange = (selectedEmotion) => {
        setEmotion(selectedEmotion);
        console.log(selectedEmotion)
    }

    const handleSentimentChange = (selectedSentiment) => {
        setSentiment(selectedSentiment);
        console.log(selectedSentiment)
    }

    const handlePromptLength = (selectedPromptLength) => {
        setPromptLength(selectedPromptLength);
        console.log(selectedPromptLength)
    }

    const handleClickCreatePage = () => {
        setVisualArtGenerativeSpace(true)
    }

const mappedMovementSomatics = data.movementSomatics
const mappedMovementThemes = data.movementThemes
const mappedEmotion = data.emotion
const mappedSentiment = data.sentiment
const mappedPromptLength = data.promptLength

const handleActiveNav = (newValue) => {
    const newState = navData.map(datum => {
        if (datum.isActive) {
            datum.isActive = false
            return datum
        }

        if (datum.title.toLowerCase() === newValue) {
            datum.isActive = true
            return datum
        }

        return datum
    })

    setNavData(newState);
};
console.log("navData", navData)

const handleStateSet = (key, value) => {
    if (key === "Movement Somatics") {
        handleMovementSomatics(value);
        const newActiveElement = "themes";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
        console.log("key", key)
        console.log("value", value)
    }
    if (key === "Themes") {
        handleMovementThemes(value);
        const newActiveElement = "emotion";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
        console.log("key", key)
        console.log("value", value)
    }    
    if (key === "Emotions") {
        handleEmotionChange(value);
        const newActiveElement = "sentiment";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }
    if (key === "Sentiment") {
        handleSentimentChange(value);
        const newActiveElement = "promptLength";
        setActiveElement(newActiveElement);
        handleActiveNav("length");
    }

    if (key === "Prompt Length") {
        handlePromptLength(value);
        const newActiveElement = "generate";
        setActiveElement(newActiveElement);
        setGenerateButton(true);
        handleActiveNav(newActiveElement);
    }

    if (key === "generateButton"){
        handleGenerate(value)
    }
}

const keys = ["movementSomatics", "movementThemes", "emotion", "sentiment", "promptLength", "generate"]

return (
    <>
      <div className="flex flex-col items-center justify-center space-y-10 h-screen">
        <div>
          <div className="flex flex-col items-center ">
            {generateButton ? (
              <>
                <div>
                  <div className="flex justify-center">
                    <button
                      className="text-4xl m-10 p-8 bg-slate-200 border border-slate-500"
                      onClick={handlePost}
                      key="generateButton"
                    >
                      GENERATE
                    </button>
                  </div>
                  <div className="font-serif text-3xl text-center pr-6 pt-10 pl-6 pb-40">
                    {postId && (
                      <MovementPrompt
                        postId={postId}
                        setOutput={setOutput}
                        output={output}
                      />
                    )}
                  </div>
                </div>
                {beginButtonVisible && (
                  <button
                    className="begin-button border border-slate-400 p-4"
                    onClick={handleClickCreatePage}
                  >
                    BEGIN
                  </button>
                )}
              </>
            ) : (
              <ParameterComponent
                key={activeElement}
                data={data[activeElement]}
                handler={handleStateSet}
                mediumNavComponent={<MediumNav navData={navData} />}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
  
            };  

export default Movement;