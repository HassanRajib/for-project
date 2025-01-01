import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Input,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  CropOriginal as CropIcon,
  Subject as SubIcon,
  Radio as RadioIcon,
  Close as CloseIcon,
  Feedback as FeedbackIcon,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Question() {
  const [questions, setQuestions] = useState([
    {
      qusText: "What is the capital city of Bangladesh?",
      qusType: "radio",
      options: [
        { optionText: "Dhaka" },
        { optionText: "Chittagong" },
        { optionText: "Sylhet" },
        { optionText: "Khulna" },
      ],
      feedback: "",
      answerKey: "",
      open: true,
      required: false,
    },
  ]);

  const handleQuestionChange = (text, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].qusText = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (text, qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex].optionText = text;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({
      optionText: `Option ${updatedQuestions[qIndex].options.length + 1}`,
    });
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(optIndex, 1);
    setQuestions(updatedQuestions);
  };

  const toggleRequired = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, required: !question.required } : question
      )
    );
  };

  const setAnswerKey = (answer, qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answerKey = answer;
    setQuestions(updatedQuestions);
  };

  const setFeedback = (feedback, qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].feedback = feedback;
    setQuestions(updatedQuestions);
  };

  const saveQuestions = () => {
    console.log("Saving questions to backend:", questions);
    alert("Questions saved successfully!");
  };

  const renderQuestions = () =>
    questions.map((ques, i) => (
      <Draggable key={i} draggableId={`question-${i}`} index={i}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-4 p-4 bg-white border border-gray-300 rounded-md shadow"
          >
            <Accordion expanded={ques.open} onChange={() => toggleQuestion(i)}>
              <AccordionSummary>
                <Typography className="font-semibold">
                  {i + 1}. {ques.qusText}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Input
                  type="text"
                  value={ques.qusText}
                  onChange={(e) => handleQuestionChange(e.target.value, i)}
                  placeholder="Question"
                  className="w-full mb-2 border border-gray-300 rounded px-2 py-1"
                />
                <Select
                  value={ques.qusType}
                  onChange={(e) => changeQuestionType(i, e.target.value)}
                  className="mb-2 w-full border border-gray-300 rounded px-2 py-1"
                >
                  <MenuItem value="text">
                    <SubIcon /> Text
                  </MenuItem>
                  <MenuItem value="checkbox">
                    <CropIcon /> Checkbox
                  </MenuItem>
                  <MenuItem value="radio">
                    <RadioIcon /> Radio
                  </MenuItem>
                </Select>
                {ques.options.map((opt, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={opt.optionText}
                      onChange={(e) => handleOptionChange(e.target.value, i, j)}
                      placeholder="Option"
                      className="flex-1 border border-gray-300 rounded px-2 py-1"
                    />
                    <IconButton
                      onClick={() => removeOption(i, j)}
                      className="ml-2 text-red-600"
                    >
                      <CloseIcon />
                    </IconButton>
                    <FormControlLabel
                      control={
                        <input
                          type={ques.qusType}
                          name={`answer-${i}`}
                          value={opt.optionText}
                          checked={ques.answerKey === opt.optionText}
                          onChange={() => setAnswerKey(opt.optionText, i)}
                        />
                      }
                      label="Set Answer"
                      className="ml-4"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => addOption(i)}
                  className="bg-blue-500 text-white px-4 py-2 rounded shadow"
                >
                  Add Option
                </Button>
                <Input
                  type="text"
                  value={ques.feedback}
                  onChange={(e) => setFeedback(e.target.value, i)}
                  placeholder="Add Feedback"
                  className="w-full mt-2 border border-gray-300 rounded px-2 py-1"
                />
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </Draggable>
    ));

  const toggleQuestion = (index) => {
    const updatedQuestions = questions.map((q, i) => ({
      ...q,
      open: i === index ? !q.open : false,
    }));
    setQuestions(updatedQuestions);
  };

  const changeQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].qusType = type;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="question-container p-4 bg-gray-50 min-h-screen">
      <DragDropContext>
        <Droppable droppableId="questions-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {renderQuestions()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outlined"
          onClick={() =>
            setQuestions([
              ...questions,
              {
                qusText: "New Question",
                qusType: "radio",
                options: [{ optionText: "Option 1" }],
                feedback: "",
                answerKey: "",
                open: true,
                required: false,
              },
            ])
          }
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          <AddCircleOutlineIcon /> Add Question
        </Button>
        <Button
          onClick={saveQuestions}
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
        >
          Save Questions
        </Button>
      </div>
    </div>
  );
}

export default Question;
