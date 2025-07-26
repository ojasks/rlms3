import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewModal = ({ formSections, responses, onClose, onSubmit, onEdit }) => {
  const getResponseIcon = (response) => {
    if (response === 'yes') return <Icon name="Check" size={16} className="text-success" />;
    if (response === 'no') return <Icon name="X" size={16} className="text-error" />;
    return <Icon name="Minus" size={16} className="text-text-tertiary" />;
  };

  const getResponseText = (response) => {
    if (response === 'yes') return 'Yes';
    if (response === 'no') return 'No';
    return 'Not answered';
  };

  const getResponseColor = (response) => {
    if (response === 'yes') return 'text-success';
    if (response === 'no') return 'text-error';
    return 'text-text-tertiary';
  };

  const totalQuestions = formSections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const unansweredQuestions = totalQuestions - answeredQuestions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Review Your Responses</h2>
            <p className="text-sm text-text-secondary mt-1">
              Please review all your answers before submitting the form
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="p-6 border-b border-border bg-secondary-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{answeredQuestions}</div>
              <div className="text-sm text-text-secondary">Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-error">{unansweredQuestions}</div>
              <div className="text-sm text-text-secondary">Unanswered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{totalQuestions}</div>
              <div className="text-sm text-text-secondary">Total Questions</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[50vh] p-6">
          <div className="space-y-8">
            {formSections.map((section, sectionIndex) => (
              <div key={section.id} className="border border-border rounded-lg overflow-hidden">
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 bg-secondary-50 border-b border-border">
                  <h3 className="font-medium text-text-primary">{section.title}</h3>
                  <button
                    onClick={() => onEdit(sectionIndex)}
                    className="flex items-center space-x-1 text-sm text-accent hover:text-accent-600 transition-colors duration-200"
                  >
                    <Icon name="Edit2" size={14} />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Questions */}
                <div className="divide-y divide-border">
                  {section.questions.map((question, questionIndex) => {
                    const response = responses[question.id];
                    const isUnanswered = !response;
                    
                    return (
                      <div key={question.id} className={`p-4 ${isUnanswered ? 'bg-error-50' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start space-x-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-secondary-200 rounded-full flex items-center justify-center text-xs font-medium text-text-primary">
                                {questionIndex + 1}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm text-text-primary mb-2">
                                  {question.text}
                                  {question.required && (
                                    <span className="text-error ml-1">*</span>
                                  )}
                                </p>
                                {isUnanswered && (
                                  <div className="flex items-center space-x-1 text-error text-xs">
                                    <Icon name="AlertCircle" size={12} />
                                    <span>This required question needs an answer</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {getResponseIcon(response)}
                            <span className={`text-sm font-medium ${getResponseColor(response)}`}>
                              {getResponseText(response)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            {unansweredQuestions > 0 && (
              <div className="flex items-center space-x-1 text-error">
                <Icon name="AlertCircle" size={14} />
                <span>Please answer all required questions before submitting</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-md transition-colors duration-200"
            >
              Continue Editing
            </button>
            <button
              onClick={onSubmit}
              disabled={unansweredQuestions > 0}
              className={`
                px-6 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${unansweredQuestions === 0
                  ? 'bg-primary text-white hover:bg-primary-700 shadow-sm'
                  : 'bg-secondary-200 text-text-tertiary cursor-not-allowed'
                }
              `}
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;