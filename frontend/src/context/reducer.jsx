export const initialState = {
    qus: [
      {
        qusText: "What is the capital city of Bangladesh?",
        qusType: "radio",
        options: [{ optionText: "Dhaka" }],
        feedback: "",
        answerKey: "",
        open: true,
        required: false,
      },
    ],
    qusType: "radio",
    doc_name: "Untitled Document",
    doc_desc: "Add a description",
  };
  
  export const actionType = {
    SET_QUS: "SET_QUS",
    CHANGE_TYPE: "CHANGE_TYPE",
    SET_DOC_NAME: "SET_DOC_NAME",
    SET_DOC_DESC: "SET_DOC_DESC",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SET_QUS:
        return {
          ...state,
          qus: action.qus,
        };
      case actionType.CHANGE_TYPE:
        return {
          ...state,
          qusType: action.qusType,
        };
      case actionType.SET_DOC_NAME:
        return {
          ...state,
          doc_name: action.doc_name,
        };
      case actionType.SET_DOC_DESC:
        return {
          ...state,
          doc_desc: action.doc_desc,
        };
      default:
        console.warn(`Unhandled action type: ${action.type}`);
        return state;
    }
  };
  
  export default reducer;
  