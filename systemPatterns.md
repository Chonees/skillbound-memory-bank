# Patrones del Sistema

## Arquitectura General

### Patrón Principal: SPA (Single Page Application)
- **Framework**: React 18 con Vite como bundler
- **Routing**: React Router DOM v6 con rutas protegidas
- **Estado**: Context API para temas y notificaciones
- **Autenticación**: JWT con localStorage/sessionStorage
- **Internacionalización**: i18next con detección automática de idioma

### Estructura Modular por Funcionalidad
```
src/
├── pages/           # Páginas principales (rutas)
├── components/      # Componentes reutilizables
├── context/         # Providers de estado global
├── utils/           # Utilidades y helpers
├── config/          # Configuraciones
├── locales/         # Archivos de traducción
└── styles/          # Estilos globales
```

## Patrones de Diseño Implementados

### 1. **Provider Pattern**
- `ThemeProvider`: Gestión de temas claro/oscuro
- `ToastProvider`: Sistema de notificaciones globales
- Contextos encapsulados con hooks personalizados

### 2. **Protected Route Pattern**
- Componente `ProtectedRoute` que valida autenticación
- Redirección automática a login si no autenticado
- Verificación de tokens en localStorage/sessionStorage

### 3. **Multi-Step Form Pattern (Onboarding)**
- Wizard de 6 pasos para configuración inicial
- Estado compartido entre pasos
- Validación progresiva
- Navegación bidireccional

### 4. **Flow-Based Navigation Pattern**
- Uso de ReactFlow para mapas visuales interactivos
- Nodos conectados representando rutas de aprendizaje
- Navegación no-lineal basada en progreso

### 5. **Component Composition Pattern**
- Componentes altamente modulares y reutilizables
- Props drilling evitado con Context API
- Separación clara de responsabilidades

## Patrones Detectados Automáticamente

- **React Router**: Navegación SPA con rutas protegidas
- **Material UI**: Sistema de diseño consistente
- **ReactFlow**: Visualización de grafos interactivos
- **React Player**: Reproducción multimedia
- **i18next**: Internacionalización
- **Emotion**: CSS-in-JS para estilos

## Arquitectura de Rutas

### Rutas Públicas
- `/` → LandingPage (página de inicio)
- `/SignUp` → Registro de usuarios
- `/SignIn` → Inicio de sesión
- `/forgot-password` → Recuperación de contraseña
- `/reset-password` → Reseteo de contraseña

### Rutas Protegidas
- `/LifeGoals` → Onboarding de objetivos de vida
- `/actionpath` → Mapa principal de habilidades
- `/actionpath/:categoryId` → Categoría específica
- `/skillmap` → Alias para actionpath (compatibilidad)
- `/learningpath` → Redirige a actionpath

## Flujo de Autenticación

1. **Verificación inicial**: Busca tokens en storage
2. **Validación**: Verifica validez del token
3. **Estado de onboarding**: Verifica completitud del perfil
4. **Redirección inteligente**: Envía al paso correcto del flujo

## Patrones de Estado

### Estado Local (useState)
- Formularios y componentes individuales
- Estados temporales de UI

### Estado de Contexto
- Autenticación del usuario
- Configuración de tema
- Sistema de notificaciones

### Estado Persistente
- localStorage: Tokens de autenticación
- sessionStorage: Datos temporales de sesión

## Componentesxt API
- Material UI

## Componentes

### App

Main App component

- **Tipo**: Componente Funcional
- **Archivo**: `src/App.jsx`

### AppContainer

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/AppContainer.jsx`
- **Props**: children, sx, showLogout, hideLogo, showNavTabs, activeTabOverride

### BranchIndicator

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/BranchIndicator/BranchIndicator.jsx`

### EditGoalsModal

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/EditGoalsModal/EditGoalsModal.jsx`
- **Props**: open, onClose, onSave

### ForgotPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/ForgotPassword/ForgotPassword.jsx`

### GoalSelector

*
 * Reusable component for selecting goals
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Callback function when goals are saved
 * @param {Function} props.onSelectionChange - Callback function when goal selection changes
 * @param {boolean} props.isModal - Whether this component is being used in a modal

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/GoalSelector/GoalSelector.jsx`
- **Props**: onSave, onSelectionChange, isModal

### GreatJob

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/GreatJob/GreatJob.jsx`
- **Props**: onClose, completedNodeTitle, open

### LandingPage

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LandingPage/LandingPage.jsx`

### LanguageSwitch

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LanguageSwitch/LanguageSwitch.jsx`

### LearningPathModules

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/LearningPathModules.jsx`

### Challenge

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Challenge/Challenge.jsx`
- **Props**: data, onComplete

### LpFeedback

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Feedback/LpFeedback.jsx`
- **Props**: onClose

### RatingStars

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Feedback/LpFeedback.jsx`
- **Props**: rating, onRatingChange, phrases

### PdfViewer

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Knowledge/Pdf.jsx`
- **Props**: data, onComplete

### Quiz

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Knowledge/Quiz.jsx`
- **Props**: data, onComplete

### Video

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Knowledge/Video.jsx`
- **Props**: data, onComplete, previousModule, onBack

### GreatJobPractice

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Practice/GreatJobPractice.jsx`
- **Props**: data, onComplete, id, onClose

### Practice

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Practice/Practice.jsx`
- **Props**: data, onComplete, onNext

### PracticePdf

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/LPModules/Modules/Practice/PracticePdf.jsx`
- **Props**: data, onComplete, onBack

### MenuDrawer

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/MenuDrawer/MenuDrawer.jsx`

### NavTabs

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/NavTabs/NavTabs.jsx`
- **Props**: tabs, activeTab, onChange, centered, sx

### ProtectedRoute

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/protectedRoute.jsx`
- **Props**: children, checkOnboarding

### ResetPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/ResetPassword/ResetPassword.jsx`

### CircularNode

Custom node component for circular nodes with app colors

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/SkillMap/ActionPath.jsx`
- **Props**: data

### ActionPath

Simple ActionPath component

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/SkillMap/ActionPath.jsx`

### CustomNode

*
 * Simplified CustomNode component

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/SkillMap/CustomNode.jsx`
- **Props**: id, data

### LearningPath

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/SkillMap/LearningPath.jsx`
- **Props**: skillId, skillName, onBack

### LearningPathNode

*
 * Componente específico para los nodos del camino de aprendizaje
 * Muestra "Step X" en texto blanco sobre un fondo de color

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/SkillMap/LearningPathNode.jsx`
- **Props**: id, data

### SubmitButton

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/SubmitButton.jsx`
- **Props**: children, isLoading

### SpotlightrPlayer

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/VideoPlayer/SpotlightrPlayer.jsx`
- **Props**: url, onVideoComplete

### VideoPlayer

- **Tipo**: Componente Funcional
- **Archivo**: `src/components/VideoPlayer/VideoPlayer.jsx`
- **Props**: url, onVideoComplete

### ThemeProvider

- **Tipo**: Componente Funcional
- **Archivo**: `src/context/ThemeContext.jsx`
- **Props**: children

### ToastProvider

- **Tipo**: Componente Funcional
- **Archivo**: `src/context/ToastContext.jsx`
- **Props**: children

### ForgotPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/ForgotPassword/ForgotPassword.jsx`

### LandingPage

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LandingPage/LandingPage.jsx`

### StepContainer

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/common/StepContainer.jsx`
- **Props**: children

### StepHeader

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/common/StepHeader.jsx`
- **Props**: step

### StepNavigation

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/common/StepNavigation.jsx`
- **Props**: step, totalSteps, onBack, onSubmit, isNextDisabled

### GoalsSelectionStep

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Goals/GoalsSelectionStep/GoalsSelectionStep.jsx`
- **Props**: onBack, onNext

### GoalsSuggestionStep

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Goals/GoalsSuggestionStep/GoalsSuggestionStep.jsx`
- **Props**: onBack, onSeeGoals

### CustomGoalInput

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/GoalsStep/CustomGoalInput.jsx`
- **Props**: value, onChange

### GoalCard

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/GoalsStep/GoalCard.jsx`
- **Props**: goal, isSelected, customGoal, onToggle, onCustomChange

### AgeGenderStep

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Setup/AgeGenderStep/AgeGenderStep.jsx`
- **Props**: formData, onSelectionChange, errors

### AgeSelector

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Setup/AgeGenderStep/AgeSelector.jsx`
- **Props**: selectedAge, onSelect

### GenderSelector

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Setup/AgeGenderStep/GenderSelector.jsx`
- **Props**: selectedGender, onSelect

### JourneyCard

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Setup/JourneyStep/JourneyCard.jsx`
- **Props**: image, isSelected, onSelect

### JourneyStep

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Setup/JourneyStep/JourneyStep.jsx`
- **Props**: formData, onSelectionChange, errors, setFormErrors

### UsernameStep

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Setup/UsernameStep/UsernameStep.jsx`
- **Props**: username, onUsernameChange, error

### SummaryItem

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Vision/SummaryStep/SummaryItem.jsx`
- **Props**: primary, secondary

### GoalItem

Component to display a specific goal

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Vision/SummaryStep/SummaryStep.jsx`
- **Props**: goal, backgroundColor, onDelete

### CategorySection

Component to display a category with its goals

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Vision/SummaryStep/SummaryStep.jsx`
- **Props**: category, goals, expanded, onToggle, onGoalDeleted

### VisionStep

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/components/steps/Vision/VisionStep/VisionStep.jsx`
- **Props**: onSelectionChange, setNextButtonEnabled

### LifeGoals

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/LifeGoals/LifeGoals.jsx`

### Feedback

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/Paths/feedback/Feedback.jsx`

### CustomBezierEdge

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/Paths/LearningPath/CustomBezierEdge.jsx`
- **Props**: id, sourceX, sourceY, targetX, targetY, style, markerEnd, data

### CustomNode

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/Paths/LearningPath/CustomNode.jsx`
- **Props**: data, id

### ErrorState

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/Paths/LearningPath/ErrorState.jsx`
- **Props**: error, onRetry

### LoadingState

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/Paths/LearningPath/LoadingState.jsx`

### ProtectedRoute

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/protectedRoute.jsx`
- **Props**: children

### ResetPassword

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/ResetPassword/ResetPassword.jsx`

### SignIn

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/SignIn/SignIn.jsx`

### SignUp

- **Tipo**: Componente Funcional
- **Archivo**: `src/pages/SignUp/SignUp.jsx`

