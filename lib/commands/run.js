const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { MemoryBank } = require('../utils/memoryBank');

async function runCommand(comando, options = {}) {
  try {
    console.log(chalk.blue('🚀 Ejecutando comando con contexto...'));
    
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

    console.log(chalk.blue(`📝 Comando: ${comando}`));
    
    if (options.context) {
      console.log(chalk.blue('📖 Cargando contexto completo...'));
      
      // Leer todo el contexto
      const files = await memoryBank.readAllFiles();
      const context = await memoryBank.generateContext();
      
      console.log(chalk.green('✅ Contexto cargado'));
      console.log(chalk.blue('\n' + '='.repeat(60)));
      console.log(chalk.yellow('CONTEXTO PARA WINDSURF:'));
      console.log(chalk.blue('='.repeat(60)));
      console.log(context);
      console.log(chalk.blue('='.repeat(60)));
      console.log(chalk.yellow('\nCOMANDO A EJECUTAR:'));
      console.log(chalk.blue('='.repeat(60)));
      console.log(comando);
      console.log(chalk.blue('='.repeat(60)));
      
      console.log(chalk.green('\n✅ Contexto y comando listos para Windsurf'));
      console.log(chalk.blue('💡 Copia el contexto de arriba y úsalo en Windsurf junto con el comando'));
      
    } else {
      console.log(chalk.yellow('⚠️ Ejecutando sin contexto completo'));
      console.log(chalk.blue('💡 Usa --context para incluir el contexto del Memory Bank'));
      console.log(chalk.blue(`\n📝 Comando: ${comando}`));
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error ejecutando comando: ${error.message}`));
    throw error;
  }
}

module.exports = { runCommand };
