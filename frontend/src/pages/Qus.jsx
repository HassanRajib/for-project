import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconButton, Button, Select, MenuItem, Input } from '@mui/material';
import Accordion from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

function Qus() {
  const [qus, setQus] = useState([
    {
      qusText: "What is the capital city of Bangladesh?",
      qusType: "radio",
      options: [
        { optionText: "Dhaka" },
        { optionText: "Chittagong" },
        { optionText: "Sylhet" },
        { optionText: "Khulna" },
      ],
      answer: false,
      open: true,
      required: false,
    },
  ]);

  const changeQus = (text, i) => {
    const newQus = [...qus];
    newQus[i].qusText = text;
    setQus(newQus);
  };

  const addQustionType = (i, type) => {
    const qs = [...qus];
    qs[i].qusType = type;
    setQus(qs);
  };

  const addOpti = (i) => {
    const newQus = [...qus];
    if (newQus[i].options.length < 5) {
      newQus[i].options.push({ optionText: "New Option" });
      setQus(newQus);
    }
  };

  const removeOpti = (i, j) => {
    const newQus = [...qus];
    if (newQus[i].options.length > 1) {
      newQus[i].options.splice(j, 1);
      setQus(newQus);
    }
  };

  const addNewQus = () => {
    setQus([
      ...qus,
      {
        qusText: "New Question",
        qusType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  };

  const handleExpand = (i) => {
    const newQus = qus.map((q, index) => ({
      ...q,
      open: index === i,
    }));
    setQus(newQus);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedQus = Array.from(qus);
    const [movedItem] = reorderedQus.splice(result.source.index, 1);
    reorderedQus.splice(result.destination.index, 0, movedItem);
    setQus(reorderedQus);
  };

  const qusUI = () =>
    qus.map((ques, i) => (
      <Draggable key={i} draggableId={`${i}`} index={i}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Accordion expanded={ques.open} onChange={() => handleExpand(i)}>
              <AccordionSummary>{ques.qusText}</AccordionSummary>
              <AccordionDetails>
                <Input
                  type="text"
                  placeholder="Question"
                  value={ques.qusText}
                  onChange={(e) => changeQus(e.target.value, i)}
                />
                <Select
                  value={ques.qusType}
                  onChange={(e) => addQustionType(i, e.target.value)}
                >
                  <MenuItem value="text">Paragraph</MenuItem>
                  <MenuItem value="checkbox">Checkbox</MenuItem>
                  <MenuItem value="radio">Multiple Choice</MenuItem>
                </Select>
                {ques.options.map((opt, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                      type="text"
                      value={opt.optionText}
                      onChange={(e) => {
                        const updatedOptions = [...ques.options];
                        updatedOptions[j].optionText = e.target.value;
                        const updatedQus = [...qus];
                        updatedQus[i].options = updatedOptions;
                        setQus(updatedQus);
                      }}
                    />
                    <IconButton onClick={() => removeOpti(i, j)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))}
                {ques.options.length < 5 && (
                  <Button onClick={() => addOpti(i)}>Add Option</Button>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </Draggable>
    ));

  return (
    <div>
      <div>
        <Input placeholder="Form Title" fullWidth />
        <Input placeholder="Form Description" fullWidth />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {qusUI()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={addNewQus} startIcon={<AddCircleOutlineIcon />}>
        Add Question
      </Button>
    </div>
  );
}

export default Qus;
