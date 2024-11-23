import React from "react";

const CheckpointsSection = ({ sections, onUpdate }) => {
  const handleChange = (sectionIndex, questionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex].response =
      !updatedSections[sectionIndex].questions[questionIndex].response;
    onUpdate(updatedSections);
  };

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4">
          <h2 className="font-bold">{section.name}</h2>
          <ul>
            {section.questions.map((question, questionIndex) => (
              <li key={questionIndex} className="flex items-center">
                <input
                  type="checkbox"
                  checked={question.response}
                  onChange={() => handleChange(sectionIndex, questionIndex)}
                  className="mr-2"
                />
                {question.question}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CheckpointsSection;
