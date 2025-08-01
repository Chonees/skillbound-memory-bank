const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { MemoryBank } = require('../utils/memoryBank');

async function execute(options = {}) {
  try {
    console.log(chalk.blue('🔍 Analizando proyecto...'));
    
    // Determinar la ruta del proyecto y Memory Bank
    const projectPath = process.cwd(); // Siempre usar el directorio actual como proyecto
    const memoryBankPath = options.path || path.join(projectPath, 'memory-bank');
    
    const memoryBank = new MemoryBank(projectPath);
    
    // Si se especifica una ruta personalizada, actualizar la ruta del Memory Bank
    if (options.path) {
      memoryBank.memoryBankPath = memoryBankPath;
    }
    
    // Verificar que Memory Bank está inicializado
    if (!memoryBank.isInitialized()) {
      console.log(chalk.yellow('⚠️ Memory Bank no está inicializado. Ejecute primero: windsurf-memory init'));
      process.exit(1);
    }
    
    // Analizar el proyecto
    const analysisData = await analyzeProject(projectPath, options);
    
    // Actualizar archivos del Memory Bank
    await updateMemoryBankFiles(memoryBank, analysisData, options);
    
    // Regenerar el contexto
    await memoryBank.generateContext();
    
    console.log(chalk.green(`✅ Análisis completado. Se identificaron ${analysisData.components.length} componentes`));
    console.log(chalk.green('✅ Memory Bank actualizado automáticamente'));
    
  } catch (error) {
    console.error(chalk.red(`❌ Error durante el análisis: ${error.message}`));
    throw error;
  }
}

async function analyzeProject(projectPath, options) {
  const data = {
    projectName: path.basename(projectPath),
    components: [],
    dependencies: {},
    patterns: [],
    fileStructure: {}
  };
  
  // Buscar archivos JavaScript/JSX solo en src/
  const jsFiles = glob.sync('src/**/*.{js,jsx}', {
    cwd: projectPath,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**', '**/coverage/**']
  });
  
  console.log(chalk.blue(`🔍 Analizando ${jsFiles.length} archivos JavaScript/JSX...`));
  
  // Analizar cada archivo
  for (const file of jsFiles) {
    try {
      const filePath = path.join(projectPath, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Parsear con Babel
      const ast = parser.parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });
      
      // Extraer componentes
      const components = extractComponents(ast, file);
      data.components.push(...components);
      
      // Extraer patrones
      const patterns = extractPatterns(content, file);
      data.patterns.push(...patterns);
      
    } catch (error) {
      if (options.verbose) {
        console.warn(chalk.yellow(`⚠️ No se pudo analizar ${file}: ${error.message}`));
      }
    }
  }
  
  // Leer package.json
  try {
    const packagePath = path.join(projectPath, 'package.json');
    const packageContent = await fs.readJson(packagePath);
    data.dependencies = { ...packageContent.dependencies, ...packageContent.devDependencies };
  } catch (error) {
    console.warn(chalk.yellow('⚠️ No se pudo leer package.json'));
  }
  
  // Analizar estructura de archivos
  data.fileStructure = await analyzeFileStructure(projectPath);
  
  return data;
}

function extractComponents(ast, filePath) {
  const components = [];
  
  traverse(ast, {
    // Componentes funcionales
    FunctionDeclaration(path) {
      const name = path.node.id?.name;
      if (name && /^[A-Z]/.test(name)) {
        components.push({
          name,
          type: 'Componente Funcional',
          file: filePath,
          props: extractProps(path.node.params)
        });
      }
    },
    
    // Arrow functions
    VariableDeclarator(path) {
      if (path.node.id?.name && /^[A-Z]/.test(path.node.id.name) && 
          path.node.init?.type === 'ArrowFunctionExpression') {
        components.push({
          name: path.node.id.name,
          type: 'Componente Funcional',
          file: filePath,
          props: extractProps(path.node.init.params)
        });
      }
    },
    
    // Componentes de clase
    ClassDeclaration(path) {
      const name = path.node.id?.name;
      if (name && /^[A-Z]/.test(name)) {
        components.push({
          name,
          type: 'Componente de Clase',
          file: filePath,
          methods: extractMethods(path.node.body.body)
        });
      }
    }
  });
  
  return components;
}

function extractProps(params) {
  if (!params || params.length === 0) return [];
  
  const firstParam = params[0];
  if (firstParam.type === 'ObjectPattern') {
    return firstParam.properties.map(prop => {
      if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
        return prop.key.name;
      }
      return null;
    }).filter(Boolean);
  }
  
  return [];
}

function extractMethods(classBody) {
  return classBody
    .filter(node => node.type === 'MethodDefinition')
    .map(node => node.key.name)
    .filter(name => name !== 'constructor');
}

function extractPatterns(content, filePath) {
  const patterns = [];
  
  // Detectar patrones comunes
  if (content.includes('react-router')) patterns.push('React Router');
  if (content.includes('redux') || content.includes('useSelector')) patterns.push('Redux');
  if (content.includes('createContext') || content.includes('useContext')) patterns.push('React Context API');
  if (content.includes('@mui/') || content.includes('material-ui')) patterns.push('Material UI');
  if (content.includes('styled-components') || content.includes('emotion')) patterns.push('Styled Components');
  if (content.includes('reactflow')) patterns.push('ReactFlow');
  
  return patterns.map(pattern => ({ pattern, file: filePath }));
}

async function analyzeFileStructure(projectPath) {
  const structure = {};
  
  try {
    const srcPath = path.join(projectPath, 'src');
    if (await fs.pathExists(srcPath)) {
      const dirs = await fs.readdir(srcPath, { withFileTypes: true });
      
      for (const dir of dirs) {
        if (dir.isDirectory()) {
          const dirPath = path.join(srcPath, dir.name);
          const files = await fs.readdir(dirPath);
          structure[`src/${dir.name}`] = files.filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
        }
      }
    }
  } catch (error) {
    console.warn(chalk.yellow('⚠️ No se pudo analizar estructura de archivos'));
  }
  
  return structure;
}

async function updateMemoryBankFiles(memoryBank, data, options) {
  // 1. Actualizar systemPatterns.md
  let systemPatternsContent = `# Patrones del Sistema\n\n## Patrones Detectados Automáticamente\n\n`;
  
  const uniquePatterns = [...new Set(data.patterns.map(p => p.pattern))];
  uniquePatterns.forEach(pattern => {
    systemPatternsContent += `- ${pattern}\n`;
  });
  
  systemPatternsContent += `\n## Componentes\n\n`;
  
  data.components.forEach(component => {
    systemPatternsContent += `### ${component.name}\n\n`;
    systemPatternsContent += `- **Tipo**: ${component.type}\n`;
    systemPatternsContent += `- **Archivo**: \`${component.file}\`\n`;
    
    if (component.props && component.props.length > 0) {
      systemPatternsContent += `- **Props**: ${component.props.join(', ')}\n`;
    }
    
    if (component.methods && component.methods.length > 0) {
      systemPatternsContent += `- **Métodos**: ${component.methods.join(', ')}\n`;
    }
    
    systemPatternsContent += `\n`;
  });
  
  await memoryBank.writeFile('systemPatterns.md', systemPatternsContent);
  
  // 2. Actualizar techContext.md
  let techContextContent = `# Contexto Técnico\n\n## Dependencias del Proyecto\n\n`;
  
  Object.entries(data.dependencies).forEach(([dep, version]) => {
    techContextContent += `- **${dep}**: ${version}\n`;
  });
  
  techContextContent += `\n## Estructura de Archivos\n\n`;
  
  Object.entries(data.fileStructure).forEach(([dir, files]) => {
    if (files.length > 0) {
      techContextContent += `### ${dir}\n\n`;
    }
    
    files.forEach(file => {
      techContextContent += `- ${file}\n`;
    });
    
    techContextContent += '\n';
  });
  
  await memoryBank.writeFile('techContext.md', techContextContent);
  
  // 3. Actualizar progress.md
  let progressContent = `# Progreso del Proyecto\n\n## Estado Actual\n\n`;
  progressContent += `- Componentes implementados: ${data.components.length}\n`;
  progressContent += `- Archivos en el proyecto: ${Object.values(data.fileStructure).flat().length}\n`;
  progressContent += `- Análisis realizado: ${new Date().toISOString().split('T')[0]}\n\n`;
  progressContent += `## Siguientes Pasos\n\n`;
  progressContent += `- Revisar la documentación generada automáticamente\n`;
  progressContent += `- Completar manualmente cualquier información faltante\n`;
  
  await memoryBank.writeFile('progress.md', progressContent);
}

module.exports = {
  execute
};