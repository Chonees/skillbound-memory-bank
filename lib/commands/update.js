const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { MemoryBank, CORE_FILES } = require('../utils/memoryBank');
const { TEMPLATES } = require('../templates/templates');

async function updateCommand(archivo, options = {}) {
  try {
    console.log(chalk.blue('🔄 Actualizando Memory Bank...'));
    
    // Determinar la ruta del Memory Bank
    const projectPath = options.path ? path.dirname(options.path) : process.cwd();
    const memoryBankPath = options.path || path.join(projectPath, 'memory-bank');
    
    const memoryBank = new MemoryBank(projectPath);
    
    // Si se especifica una ruta personalizada, actualizar la ruta del Memory Bank
    if (options.path) {
      memoryBank.memoryBankPath = memoryBankPath;
    }
    
    // Verificar que Memory Bank está inicializado
    if (!memoryBank.isInitialized()) {
      console.log(chalk.red('❌ Memory Bank no está inicializado'));
      console.log(chalk.yellow('💡 Ejecuta primero: windsurf-memory init'));
      return;
    }

    let filesToUpdate = [];

    if (options.all) {
      filesToUpdate = CORE_FILES;
    } else if (archivo) {
      if (CORE_FILES.includes(archivo)) {
        filesToUpdate = [archivo];
      } else {
        console.log(chalk.red(`❌ Archivo no válido: ${archivo}`));
        console.log(chalk.blue('Archivos disponibles:'));
        CORE_FILES.forEach(file => console.log(`  - ${file}`));
        return;
      }
    } else {
      // Mostrar opciones disponibles
      const { selectedFiles } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedFiles',
          message: 'Selecciona los archivos a actualizar:',
          choices: CORE_FILES.map(file => ({
            name: file,
            value: file
          }))
        }
      ]);
      filesToUpdate = selectedFiles;
    }

    if (filesToUpdate.length === 0) {
      console.log(chalk.yellow('No se seleccionaron archivos para actualizar.'));
      return;
    }

    // Actualizar archivos
    for (const filename of filesToUpdate) {
      if (options.interactive) {
        const { action } = await inquirer.prompt([
          {
            type: 'list',
            name: 'action',
            message: `¿Qué hacer con ${filename}?`,
            choices: [
              { name: 'Editar manualmente', value: 'edit' },
              { name: 'Actualizar timestamp', value: 'timestamp' },
              { name: 'Regenerar desde template', value: 'regenerate' },
              { name: 'Saltar', value: 'skip' }
            ]
          }
        ]);

        switch (action) {
          case 'edit':
            console.log(chalk.blue(`📝 Abre ${filename} en tu editor para editarlo manualmente`));
            console.log(chalk.gray(`Ruta: ${path.join(memoryBank.memoryBankPath, filename)}`));
            break;
          
          case 'timestamp':
            const existingContent = await memoryBank.readFile(filename);
            await memoryBank.writeFile(filename, existingContent.content);
            console.log(chalk.green(`✓ ${filename} timestamp actualizado`));
            break;
          
          case 'regenerate':
            const template = TEMPLATES[filename];
            if (template) {
              const projectName = path.basename(projectPath);
              const content = template.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
              await memoryBank.writeFile(filename, content);
              console.log(chalk.green(`✓ ${filename} regenerado desde template`));
            }
            break;
          
          case 'skip':
            console.log(chalk.yellow(`⏭️ ${filename} omitido`));
            break;
        }
      } else {
        // Actualización automática de timestamp
        try {
          const existingContent = await memoryBank.readFile(filename);
          await memoryBank.writeFile(filename, existingContent.content);
          console.log(chalk.green(`✓ ${filename} actualizado`));
        } catch (error) {
          // Si el archivo no existe, crearlo desde template
          const template = TEMPLATES[filename];
          if (template) {
            const projectName = path.basename(projectPath);
            const content = template.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
            await memoryBank.writeFile(filename, content);
            console.log(chalk.green(`✓ ${filename} creado desde template`));
          } else {
            console.log(chalk.red(`❌ No se pudo actualizar ${filename}: ${error.message}`));
          }
        }
      }
    }

    // Regenerar cache de contexto
    console.log(chalk.blue('🔄 Regenerando cache de contexto...'));
    const context = await memoryBank.generateContext();
    const contextPath = path.join(memoryBank.memoryBankPath, '.context-cache.md');
    await fs.writeFile(contextPath, context, 'utf8');
    
    console.log(chalk.green('✅ Memory Bank actualizado exitosamente'));
    
  } catch (error) {
    console.error(chalk.red(`❌ Error actualizando Memory Bank: ${error.message}`));
    throw error;
  }
}

module.exports = { updateCommand };
