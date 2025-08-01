# Patrones del Sistema

## Patrones Detectados Automáticamente

- React Router
- Material UI
- ReactFlow
- React Context API

## Componentes

### App

- **Tipo**: Componente Funcional
- **Archivo**: `src\App.jsx`

### ProtectedRoute

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\protectedRoute.jsx`
- **Props**: children

### SignUp

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\SignUp\SignUp.jsx`

### SignIn

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\SignIn\SignIn.jsx`

### ResetPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\ResetPassword\ResetPassword.jsx`

### LoadingState

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\Paths\LearningPath\LoadingState.jsx`

### ErrorState

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\Paths\LearningPath\ErrorState.jsx`
- **Props**: error, onRetry

### CustomNode

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\Paths\LearningPath\CustomNode.jsx`
- **Props**: data, id

### CustomBezierEdge

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\Paths\LearningPath\CustomBezierEdge.jsx`
- **Props**: id, sourceX, sourceY, targetX, targetY, style, markerEnd, data

### Feedback

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\Paths\feedback\Feedback.jsx`

### LifeGoals

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\LifeGoals.jsx`

### VisionStep

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Vision\VisionStep\VisionStep.jsx`
- **Props**: onSelectionChange, setNextButtonEnabled

### GoalItem

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Vision\SummaryStep\SummaryStep.jsx`
- **Props**: goal, backgroundColor, onDelete

### CategorySection

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Vision\SummaryStep\SummaryStep.jsx`
- **Props**: category, goals, expanded, onToggle, onGoalDeleted

### SummaryItem

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Vision\SummaryStep\SummaryItem.jsx`
- **Props**: primary, secondary

### UsernameStep

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Setup\UsernameStep\UsernameStep.jsx`
- **Props**: username, onUsernameChange, error

### JourneyStep

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Setup\JourneyStep\JourneyStep.jsx`
- **Props**: formData, onSelectionChange, errors, setFormErrors

### JourneyCard

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Setup\JourneyStep\JourneyCard.jsx`
- **Props**: image, isSelected, onSelect

### GenderSelector

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Setup\AgeGenderStep\GenderSelector.jsx`
- **Props**: selectedGender, onSelect

### AgeSelector

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Setup\AgeGenderStep\AgeSelector.jsx`
- **Props**: selectedAge, onSelect

### AgeGenderStep

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Setup\AgeGenderStep\AgeGenderStep.jsx`
- **Props**: formData, onSelectionChange, errors

### GoalCard

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\GoalsStep\GoalCard.jsx`
- **Props**: goal, isSelected, customGoal, onToggle, onCustomChange

### CustomGoalInput

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\GoalsStep\CustomGoalInput.jsx`
- **Props**: value, onChange

### GoalsSuggestionStep

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Goals\GoalsSuggestionStep\GoalsSuggestionStep.jsx`
- **Props**: onBack, onSeeGoals

### GoalsSelectionStep

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\steps\Goals\GoalsSelectionStep\GoalsSelectionStep.jsx`
- **Props**: onBack, onNext

### StepNavigation

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\common\StepNavigation.jsx`
- **Props**: step, totalSteps, onBack, onSubmit, isNextDisabled

### StepHeader

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\common\StepHeader.jsx`
- **Props**: step

### StepContainer

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LifeGoals\components\common\StepContainer.jsx`
- **Props**: children

### LandingPage

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\LandingPage\LandingPage.jsx`

### ForgotPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src\pages\ForgotPassword\ForgotPassword.jsx`

### ToastProvider

- **Tipo**: Componente Funcional
- **Archivo**: `src\context\ToastContext.jsx`
- **Props**: children

### ThemeProvider

- **Tipo**: Componente Funcional
- **Archivo**: `src\context\ThemeContext.jsx`
- **Props**: children

### SubmitButton

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\SubmitButton.jsx`
- **Props**: children, isLoading

### ProtectedRoute

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\protectedRoute.jsx`
- **Props**: children, checkOnboarding

### AppContainer

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\AppContainer.jsx`
- **Props**: children, sx, showLogout, hideLogo, showNavTabs, activeTabOverride

### VideoPlayer

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\VideoPlayer\VideoPlayer.jsx`
- **Props**: url, onVideoComplete

### SpotlightrPlayer

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\VideoPlayer\SpotlightrPlayer.jsx`
- **Props**: url, onVideoComplete

### LearningPathNode

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\SkillMap\LearningPathNode.jsx`
- **Props**: id, data

### LearningPath

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\SkillMap\LearningPath.jsx`
- **Props**: skillId, skillName, onBack

### CustomNode

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\SkillMap\CustomNode.jsx`
- **Props**: id, data

### CircularNode

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\SkillMap\ActionPath.jsx`
- **Props**: data

### ActionPath

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\SkillMap\ActionPath.jsx`

### ResetPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\ResetPassword\ResetPassword.jsx`

### NavTabs

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\NavTabs\NavTabs.jsx`
- **Props**: tabs, activeTab, onChange, centered, sx

### MenuDrawer

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\MenuDrawer\MenuDrawer.jsx`

### LearningPathModules

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\LearningPathModules.jsx`

### PracticePdf

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Practice\PracticePdf.jsx`
- **Props**: data, onComplete, onBack

### Practice

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Practice\Practice.jsx`
- **Props**: data, onComplete, onNext

### GreatJobPractice

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Practice\GreatJobPractice.jsx`
- **Props**: data, onComplete, id, onClose

### Video

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Knowledge\Video.jsx`
- **Props**: data, onComplete, previousModule, onBack

### Quiz

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Knowledge\Quiz.jsx`
- **Props**: data, onComplete

### PdfViewer

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Knowledge\Pdf.jsx`
- **Props**: data, onComplete

### LpFeedback

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Feedback\LpFeedback.jsx`
- **Props**: onClose

### RatingStars

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Feedback\LpFeedback.jsx`
- **Props**: rating, onRatingChange, phrases

### Challenge

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LPModules\Modules\Challenge\Challenge.jsx`
- **Props**: data, onComplete

### LanguageSwitch

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LanguageSwitch\LanguageSwitch.jsx`

### LandingPage

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\LandingPage\LandingPage.jsx`

### GreatJob

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\GreatJob\GreatJob.jsx`
- **Props**: onClose, completedNodeTitle, open

### GoalSelector

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\GoalSelector\GoalSelector.jsx`
- **Props**: onSave, onSelectionChange, isModal

### ForgotPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\ForgotPassword\ForgotPassword.jsx`

### EditGoalsModal

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\EditGoalsModal\EditGoalsModal.jsx`
- **Props**: open, onClose, onSave

### BranchIndicator

- **Tipo**: Componente Funcional
- **Archivo**: `src\components\BranchIndicator\BranchIndicator.jsx`



---
*Creado: 2025-08-01 01:59:16*
*Última actualización: 2025-08-01 01:59:16*