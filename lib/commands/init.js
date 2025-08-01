const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { MemoryBank, CORE_FILES } = require('../utils/memoryBank');
const { TEMPLATES } = require('../templates/templates');

async function initCommand(proyecto, options = {}) {
  console.log(chalk.blue('🧠 Inicializando Windsurf Memory Bank...'));
  
  // Determinar la ruta del Memory Bank
  const projectPath = options.path ? path.dirname(options.path) : process.cwd();
  const memoryBankPath = options.path || path.join(projectPath, 'memory-bank');
  
  const memoryBank = new MemoryBank(projectPath);
  
  // Si se especifica una ruta personalizada, actualizar la ruta del Memory Bank
  if (options.path) {
    memoryBank.memoryBankPath = memoryBankPath;
  }
  
  // Verificar si ya está inicializado
  if (memoryBank.isInitialized() && !options.force) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'El Memory Bank ya existe. ¿Deseas sobrescribirlo?',
        default: false
      }
    ]);
    
    if (!overwrite) {
      console.log(chalk.yellow('Operación cancelada.'));
      return;
    }
  }

  // Obtener nombre del proyecto
  let projectName = proyecto;
  if (!projectName) {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del proyecto:',
        default: path.basename(projectPath)
      }
    ]);
    projectName = response.name;
  }

  try {
    // Crear directorio del Memory Bank
    await fs.ensureDir(memoryBank.memoryBankPath);
    console.log(chalk.green(`✓ Directorio creado: ${memoryBank.memoryBankPath}`));

    // Crear archivos core
    const creationPromises = CORE_FILES.map(async (filename) => {
      const template = TEMPLATES[filename];
      if (template) {
        const content = template.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
        await memoryBank.writeFile(filename, content);
        console.log(chalk.green(`✓ ${filename} actualizado`));
      }
    });

    await Promise.all(creationPromises);

    // Crear archivo de configuración
    const config = {
      projectName,
      createdAt: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const configPath = path.join(memoryBank.memoryBankPath, 'config.json');
    await fs.writeJson(configPath, config, { spaces: 2 });
    console.log(chalk.green('✓ config.json creado'));

    // Crear README del Memory Bank
    const readmeContent = `# Memory Bank: ${projectName}

Este directorio contiene el Memory Bank para el proyecto ${projectName}.

## Archivos Core
- \`projectbrief.md\`: Descripción general y objetivos del proyecto
- \`productContext.md\`: Contexto del producto y casos de uso
- \`systemPatterns.md\`: Patrones arquitectónicos y técnicos
- \`techContext.md\`: Stack tecnológico y dependencias
- \`activeContext.md\`: Contexto actual de trabajo
- \`progress.md\`: Estado y progreso del proyecto

## Uso
1. Ejecuta \`windsurf-memory read\` para cargar el contexto
2. Ejecuta \`windsurf-memory analyze\` para actualizar automáticamente
3. Usa \`windsurf-memory run "comando"\` para ejecutar con contexto

Creado: ${new Date().toLocaleDateString()}
`;

    const readmePath = path.join(memoryBank.memoryBankPath, 'README.md');
    await fs.writeFile(readmePath, readmeContent, 'utf8');
    console.log(chalk.green('✓ README.md creado'));

    console.log(chalk.green('\n🎉 Memory Bank inicializado exitosamente!'));
    console.log(chalk.blue('\nPróximos pasos:'));
    console.log('1. Edita los archivos en memory-bank/ con información específica de tu proyecto');
    console.log('2. Ejecuta `windsurf-memory read` para verificar el contexto');
    console.log('3. Usa `windsurf-memory status` para verificar la integridad');

  } catch (error) {
    console.error(chalk.red(`❌ Error inicializando Memory Bank: ${error.message}`));
    throw error;
  }
}

module.exports = { initCommand };
