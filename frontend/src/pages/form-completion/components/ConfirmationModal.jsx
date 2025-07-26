import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ConfirmationModal = ({ formTitle, onConfirm, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Send" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Submit Form</h2>
              <p className="text-sm text-text-secondary">Confirm your submission</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-primary mb-4">
            Are you sure you want to submit <strong>"{formTitle}"</strong>?
          </p>
          
          <div className="bg-accent-50 border border-accent-200 rounded-md p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-accent-700">
                <p className="font-medium mb-1">Please note:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Once submitted, you cannot modify your responses</li>
                  <li>• Your submission will be recorded with a timestamp</li>
                  <li>• You will receive a confirmation email shortly</li>
                </ul>
              </div>
            </div>
          </div>

          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 text-primary mb-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} />
              </div>
              <span className="text-sm">Submitting your form...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin">
                  <Icon name="Loader2" size={16} />
                </div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Icon name="Send" size={16} />
                <span>Submit Form</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;