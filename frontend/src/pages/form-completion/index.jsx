import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import FormProgress from './components/FormProgress';
import QuestionSection from './components/QuestionSection';
import NavigationControls from './components/NavigationControls';
import ReviewModal from './components/ReviewModal';
import ConfirmationModal from './components/ConfirmationModal';

const FormCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get form data from navigation state or use default
  const formData = location.state?.form || {
    id: 'safety-protocols',
    title: 'Laboratory Safety Protocols Compliance',
    description: 'Annual safety compliance verification for research laboratory personnel',
    category: 'Safety & Compliance',
    estimatedTime: 15,
    totalQuestions: 25
  };

  // User and UI state
  const [currentUser] = useState({
    id: 1,
    name: "Dr. Sarah Chen",
    role: "normal",
    email: "sarah.chen@researchlab.edu",
    macAddress: "00:1B:44:11:3A:B7",
    ipAddress: "192.168.1.45",
    network: "ResearchLab-Secure"
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Form state
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Mock form sections with questions
  const formSections = [
    {
      id: 'personal-protective-equipment',
      title: 'Personal Protective Equipment',
      questions: [
        {
          id: 'ppe-1',
          text: 'Do you always wear appropriate safety goggles when handling chemicals?',
          required: true,
          helpText: 'Safety goggles must be worn at all times when working with hazardous materials'
        },
        {
          id: 'ppe-2',
          text: 'Do you use proper gloves for each type of chemical or biological material?',
          required: true,
          helpText: 'Different materials require specific glove types for adequate protection'
        },
        {
          id: 'ppe-3',
          text: 'Do you wear lab coats or protective clothing in designated areas?',
          required: true,
          helpText: 'Lab coats protect both you and your clothing from contamination'
        },
        {
          id: 'ppe-4',
          text: 'Do you properly dispose of used PPE according to lab protocols?',
          required: true,
          helpText: 'Proper disposal prevents contamination and maintains lab safety'
        },
        {
          id: 'ppe-5',
          text: 'Do you inspect PPE for damage before each use?',
          required: true,
          helpText: 'Damaged PPE may not provide adequate protection'
        }
      ]
    },
    {
      id: 'chemical-handling',
      title: 'Chemical Handling & Storage',
      questions: [
        {
          id: 'chem-1',
          text: 'Do you read Safety Data Sheets (SDS) before using new chemicals?',
          required: true,
          helpText: 'SDS provides critical safety information for chemical handling'
        },
        {
          id: 'chem-2',
          text: 'Do you store chemicals according to compatibility guidelines?',
          required: true,
          helpText: 'Incompatible chemicals can react dangerously when stored together'
        },
        {
          id: 'chem-3',
          text: 'Do you properly label all chemical containers with contents and date?',
          required: true,
          helpText: 'Proper labeling prevents accidents and ensures traceability'
        },
        {
          id: 'chem-4',
          text: 'Do you use fume hoods when working with volatile chemicals?',
          required: true,
          helpText: 'Fume hoods protect you from inhaling dangerous vapors'
        },
        {
          id: 'chem-5',
          text: 'Do you know the location of emergency eyewash and shower stations?',
          required: true,
          helpText: 'Quick access to emergency equipment is crucial in case of exposure'
        }
      ]
    },
    {
      id: 'equipment-safety',
      title: 'Equipment Safety & Maintenance',
      questions: [
        {
          id: 'equip-1',
          text: 'Do you perform safety checks on equipment before each use?',
          required: true,
          helpText: 'Regular safety checks prevent equipment-related accidents'
        },
        {
          id: 'equip-2',
          text: 'Do you report any equipment malfunctions immediately?',
          required: true,
          helpText: 'Prompt reporting prevents accidents and ensures proper maintenance'
        },
        {
          id: 'equip-3',
          text: 'Do you follow lockout/tagout procedures for maintenance?',
          required: true,
          helpText: 'LOTO procedures prevent accidental equipment activation during maintenance'
        },
        {
          id: 'equip-4',
          text: 'Do you maintain proper ventilation in work areas?',
          required: true,
          helpText: 'Adequate ventilation prevents accumulation of hazardous vapors'
        },
        {
          id: 'equip-5',
          text: 'Do you keep work areas clean and organized?',
          required: true,
          helpText: 'Clean, organized workspaces reduce the risk of accidents'
        }
      ]
    },
    {
      id: 'emergency-procedures',
      title: 'Emergency Procedures',
      questions: [
        {
          id: 'emerg-1',
          text: 'Do you know the evacuation routes from your work area?',
          required: true,
          helpText: 'Knowing evacuation routes is essential for emergency response'
        },
        {
          id: 'emerg-2',
          text: 'Do you know how to operate fire extinguishers in your area?',
          required: true,
          helpText: 'Proper fire extinguisher use can prevent small fires from spreading'
        },
        {
          id: 'emerg-3',
          text: 'Do you know who to contact in case of a chemical spill?',
          required: true,
          helpText: 'Quick response to spills minimizes exposure and environmental impact'
        },
        {
          id: 'emerg-4',
          text: 'Do you participate in regular emergency drills?',
          required: true,
          helpText: 'Regular drills ensure you can respond effectively in real emergencies'
        },
        {
          id: 'emerg-5',
          text: 'Do you know the location of first aid supplies and AED units?',
          required: true,
          helpText: 'Quick access to first aid can be critical in emergency situations'
        }
      ]
    },
    {
      id: 'waste-management',
      title: 'Waste Management & Disposal',
      questions: [
        {
          id: 'waste-1',
          text: 'Do you segregate waste according to laboratory protocols?',
          required: true,
          helpText: 'Proper waste segregation prevents dangerous reactions and contamination'
        },
        {
          id: 'waste-2',
          text: 'Do you use appropriate containers for different waste types?',
          required: true,
          helpText: 'Different waste types require specific containers for safe disposal'
        },
        {
          id: 'waste-3',
          text: 'Do you properly label all waste containers?',
          required: true,
          helpText: 'Proper labeling ensures safe handling and disposal by waste management'
        },
        {
          id: 'waste-4',
          text: 'Do you avoid overfilling waste containers?',
          required: true,
          helpText: 'Overfilled containers can lead to spills and exposure risks'
        },
        {
          id: 'waste-5',
          text: 'Do you schedule regular waste pickups as required?',
          required: true,
          helpText: 'Regular pickups prevent accumulation of hazardous waste'
        }
      ]
    }
  ];

  // Calculate progress
  const totalQuestions = formSections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  const estimatedTimeRemaining = Math.max(0, Math.round((formData.estimatedTime * (1 - progressPercentage / 100))));

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(responses).length > 0) {
        setIsAutoSaving(true);
        // Simulate auto-save
        setTimeout(() => {
          setIsAutoSaving(false);
          setLastSaved(new Date());
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [responses]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear validation error for this question
    if (validationErrors[questionId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCurrentSection = () => {
    const currentSectionData = formSections[currentSection];
    const errors = {};
    
    currentSectionData.questions.forEach(question => {
      if (question.required && !responses[question.id]) {
        errors[question.id] = 'This question is required';
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      if (currentSection < formSections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setShowReviewModal(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSaveDraft = () => {
    setIsAutoSaving(true);
    setTimeout(() => {
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handleSubmitForm = () => {
    // Validate all sections
    let allValid = true;
    const allErrors = {};
    
    formSections.forEach(section => {
      section.questions.forEach(question => {
        if (question.required && !responses[question.id]) {
          allErrors[question.id] = 'This question is required';
          allValid = false;
        }
      });
    });
    
    if (!allValid) {
      setValidationErrors(allErrors);
      setShowReviewModal(false);
      // Navigate to first section with errors
      const firstErrorSection = formSections.findIndex(section => 
        section.questions.some(q => allErrors[q.id])
      );
      setCurrentSection(firstErrorSection);
      return;
    }
    
    setShowReviewModal(false);
    setShowConfirmationModal(true);
  };

  const handleFinalSubmit = () => {
    // Simulate form submission
    setTimeout(() => {
      setShowConfirmationModal(false);
      navigate('/form-listing', { 
        state: { 
          message: 'Form submitted successfully!',
          type: 'success'
        }
      });
    }, 2000);
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={currentUser}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userRole={currentUser.role}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`
        pt-header transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)]
        ${isSidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar'}
      `}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Form Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <button
                onClick={() => navigate('/form-listing')}
                className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Back to Forms</span>
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Form Completion</span>
            </div>
            
            <h1 className="text-2xl font-bold text-text-primary mb-2">{formData.title}</h1>
            <p className="text-text-secondary">{formData.description}</p>
          </div>

          {/* Progress Indicator */}
          <FormProgress
            currentSection={currentSection + 1}
            totalSections={formSections.length}
            progressPercentage={progressPercentage}
            estimatedTimeRemaining={estimatedTimeRemaining}
            isAutoSaving={isAutoSaving}
            lastSaved={lastSaved}
          />

          {/* Form Content */}
          <div className="bg-surface rounded-lg border border-border shadow-sm">
            <QuestionSection
              section={formSections[currentSection]}
              responses={responses}
              onResponseChange={handleResponseChange}
              validationErrors={validationErrors}
            />

            <NavigationControls
              currentSection={currentSection}
              totalSections={formSections.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSaveDraft={handleSaveDraft}
              isAutoSaving={isAutoSaving}
              canProceed={validateCurrentSection()}
            />
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          formSections={formSections}
          responses={responses}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitForm}
          onEdit={(sectionIndex) => {
            setShowReviewModal(false);
            setCurrentSection(sectionIndex);
          }}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          formTitle={formData.title}
          onConfirm={handleFinalSubmit}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default FormCompletion;