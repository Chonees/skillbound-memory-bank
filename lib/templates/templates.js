const TEMPLATES = {
  'projectbrief.md': `# Descripción del Proyecto

## {{PROJECT_NAME}}

Este proyecto es una aplicación web desarrollada con tecnologías modernas.

## Objetivos Principales
- [Objetivo 1]
- [Objetivo 2]
- [Objetivo 3]

## Alcance del Proyecto
### Incluye
- [Funcionalidad 1]
- [Funcionalidad 2]

### No Incluye
- [Exclusión 1]
- [Exclusión 2]

## Stakeholders
- **Product Owner**: [Nombre]
- **Tech Lead**: [Nombre]
- **Desarrolladores**: [Nombres]

## Criterios de Éxito
- [Criterio 1]
- [Criterio 2]
- [Criterio 3]
`,

  'productContext.md': `# Product Context: {{PROJECT_NAME}}

## ¿Por qué existe este proyecto?
[Explicar el problema que resuelve y la necesidad que satisface]

## Problemas que Resuelve
1. **Problema Principal**: [Descripción detallada]
2. **Problemas Secundarios**: 
   - [Problema 2]
   - [Problema 3]

## ¿Cómo debería funcionar?
### Flujo de Usuario Principal
1. [Paso 1 del flujo]
2. [Paso 2 del flujo]
3. [Paso 3 del flujo]

### Casos de Uso Clave
- **Caso 1**: [Descripción y flujo]
- **Caso 2**: [Descripción y flujo]

## Objetivos de Experiencia de Usuario
- **Facilidad de uso**: [Expectativas]
- **Rendimiento**: [Expectativas]
- **Accesibilidad**: [Consideraciones]

## Métricas de Éxito
- [Métrica 1]: [Valor objetivo]
- [Métrica 2]: [Valor objetivo]

## Contexto del Mercado/Dominio
[Información relevante sobre el dominio, competencia, o contexto específico]
`,

  'systemPatterns.md': `# Patrones del Sistema

## Patrones Detectados

- React Router
- Material UI

## Componentes

[Los componentes se actualizarán automáticamente con el comando analyze]

## Arquitectura

### Estructura de Carpetas
\`\`\`
src/
├── components/
├── pages/
├── utils/
└── styles/
\`\`\`

### Patrones de Diseño
- [Patrón 1]
- [Patrón 2]
- [Patrón 3]

## Decisiones Técnicas
- [Decisión 1]: [Justificación]
- [Decisión 2]: [Justificación]
`,

  'techContext.md': `# Contexto Técnico

## Stack Tecnológico

### Frontend
- [Tecnología 1]
- [Tecnología 2]

### Backend
- [Tecnología 1]
- [Tecnología 2]

### Base de Datos
- [Base de datos]

## Dependencias Principales

[Las dependencias se actualizarán automáticamente con el comando analyze]

## Configuración del Entorno

### Variables de Entorno
\`\`\`
VARIABLE_1=valor
VARIABLE_2=valor
\`\`\`

### Comandos Frecuentes
\`\`\`bash
npm start
npm test
npm build
\`\`\`

## Estructura del Proyecto

[La estructura se actualizará automáticamente con el comando analyze]
`,

  'activeContext.md': `# Contexto Activo

## Current work focus
[Describe en qué estás trabajando actualmente]

## Recent changes
- [Cambio 1]
- [Cambio 2]
- [Cambio 3]

## Next steps
- [ ] [Tarea 1]
- [ ] [Tarea 2]
- [ ] [Tarea 3]

## Pending decisions
- [Decisión pendiente 1]
- [Decisión pendiente 2]

## Blockers
- [Bloqueador 1]
- [Bloqueador 2]

## Notes
[Notas adicionales sobre el trabajo actual]
`,

  'progress.md': `# Progreso del Proyecto

## What works
- [Funcionalidad 1]
- [Funcionalidad 2]

## What doesn't work
- [Problema 1]
- [Problema 2]

## What's missing
- [Funcionalidad faltante 1]
- [Funcionalidad faltante 2]

## Recent accomplishments
- [Logro 1]
- [Logro 2]

## Known issues
- [Issue 1]
- [Issue 2]

## Performance metrics
- [Métrica 1]: [Valor actual]
- [Métrica 2]: [Valor actual]

## Next milestones
- [Milestone 1]: [Fecha objetivo]
- [Milestone 2]: [Fecha objetivo]
`
};

module.exports = { TEMPLATES };
