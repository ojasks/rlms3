import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuestionSection = ({ section, responses, onResponseChange, validationErrors }) => {
  const [expandedHelp, setExpandedHelp] = useState({});

  const toggleHelp = (questionId) => {
    setExpandedHelp(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="p-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          {section.title}
        </h2>
        <p className="text-text-secondary text-sm">
          Please answer all questions in this section to proceed.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {section.questions.map((question, index) => (
          <div key={question.id} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
            {/* Question Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-text-primary">
                  {index + 1}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-text-primary mb-2 leading-relaxed">
                      {question.text}
                      {question.required && (
                        <span className="text-error ml-1">*</span>
                      )}
                    </h3>
                    
                    {/* Help Text Toggle */}
                    {question.helpText && (
                      <button
                        onClick={() => toggleHelp(question.id)}
                        className="flex items-center space-x-1 text-sm text-accent hover:text-accent-600 transition-colors duration-200"
                      >
                        <Icon name="HelpCircle" size={14} />
                        <span>
                          {expandedHelp[question.id] ? 'Hide guidance' : 'Show guidance'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Help Text */}
                {question.helpText && expandedHelp[question.id] && (
                  <div className="mt-3 p-3 bg-accent-50 border border-accent-200 rounded-md">
                    <div className="flex items-start space-x-2">
                      <Icon name="Info" size={16} className="text-accent-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-accent-700">
                        {question.helpText}
                      </p>
                    </div>
                  </div>
                )}

                {/* Response Options */}
                <div className="mt-4">
                  <div className="flex items-center space-x-6">
                    {/* Yes Option */}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name={question.id}
                          value="yes"
                          checked={responses[question.id] === 'yes'}
                          onChange={(e) => onResponseChange(question.id, e.target.value)}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded-full border-2 transition-all duration-200
                          ${responses[question.id] === 'yes' ?'border-success bg-success' :'border-secondary-300 group-hover:border-success'
                          }
                        `}>
                          {responses[question.id] === 'yes' && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                              <Icon name="Check" size={12} color="white" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`
                        text-sm font-medium transition-colors duration-200
                        ${responses[question.id] === 'yes' ?'text-success' :'text-text-primary group-hover:text-success'
                        }
                      `}>
                        Yes
                      </span>
                    </label>

                    {/* No Option */}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name={question.id}
                          value="no"
                          checked={responses[question.id] === 'no'}
                          onChange={(e) => onResponseChange(question.id, e.target.value)}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded-full border-2 transition-all duration-200
                          ${responses[question.id] === 'no' ?'border-error bg-error' :'border-secondary-300 group-hover:border-error'
                          }
                        `}>
                          {responses[question.id] === 'no' && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                              <Icon name="X" size={12} color="white" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`
                        text-sm font-medium transition-colors duration-200
                        ${responses[question.id] === 'no' ?'text-error' :'text-text-primary group-hover:text-error'
                        }
                      `}>
                        No
                      </span>
                    </label>
                  </div>

                  {/* Validation Error */}
                  {validationErrors[question.id] && (
                    <div className="mt-2 flex items-center space-x-1 text-error">
                      <Icon name="AlertCircle" size={14} />
                      <span className="text-sm">{validationErrors[question.id]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSection;