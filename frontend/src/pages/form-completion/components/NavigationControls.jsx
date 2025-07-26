import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationControls = ({ 
  currentSection, 
  totalSections, 
  onPrevious, 
  onNext, 
  onSaveDraft, 
  isAutoSaving,
  canProceed 
}) => {
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === totalSections - 1;

  return (
    <div className="border-t border-border p-6">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirstSection}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${isFirstSection
              ? 'text-text-tertiary cursor-not-allowed' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
            }
          `}
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </button>

        {/* Center Controls */}
        <div className="flex items-center space-x-4">
          {/* Save Draft Button */}
          <button
            onClick={onSaveDraft}
            disabled={isAutoSaving}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAutoSaving ? (
              <>
                <div className="animate-spin">
                  <Icon name="Loader2" size={16} />
                </div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Save Draft</span>
              </>
            )}
          </button>

          {/* Section Indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
            <span>Section</span>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalSections }, (_, index) => (
                <div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${index === currentSection
                      ? 'bg-primary'
                      : index < currentSection
                        ? 'bg-success' :'bg-secondary-300'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Next/Review Button */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            flex items-center space-x-2 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${canProceed
              ? 'bg-primary text-white hover:bg-primary-700 shadow-sm'
              : 'bg-secondary-200 text-text-tertiary cursor-not-allowed'
            }
          `}
        >
          <span>{isLastSection ? 'Review & Submit' : 'Next'}</span>
          <Icon name={isLastSection ? "Eye" : "ChevronRight"} size={16} />
        </button>
      </div>

      {/* Mobile Section Indicator */}
      <div className="sm:hidden mt-4 flex items-center justify-center space-x-1">
        {Array.from({ length: totalSections }, (_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-200
              ${index === currentSection
                ? 'bg-primary'
                : index < currentSection
                  ? 'bg-success' :'bg-secondary-300'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationControls;