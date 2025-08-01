const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { MemoryBank } = require('../utils/memoryBank');

async function readCommand(options = {}) {
  try {
    console.log(chalk.blue('📖 Leyendo Memory Bank...'));
    
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
      console.log(chalk.red('❌ Memory Bank no está inicializado.'));
      console.log(chalk.yellow('💡 Ejecuta primero: windsurf-memory init'));
      return;
    }

    // Leer archivos
    const files = await memoryBank.readAllFiles();
    const stats = await memoryBank.getStats();
    
    console.log(chalk.green(`✓ Todos los archivos core encontrados (${stats.totalFiles})`));
    
    // Mostrar resumen
    if (!options.verbose) {
      console.log(chalk.blue('\n📊 Resumen del Memory Bank:'));
      console.log(`Total de archivos: ${stats.totalFiles}`);
      console.log(`Estado: ${stats.isComplete ? 'Completo' : 'Incompleto'}`);
      
      console.log(chalk.blue('\n📁 Archivos:'));
      for (const [filename, fileStats] of Object.entries(stats.files)) {
        const size = (fileStats.size / 1024).toFixed(1);
        const timeAgo = getTimeAgo(fileStats.lastModified);
        console.log(`  ${filename}: ${size}KB, ${fileStats.lines} líneas, modificado ${timeAgo}`);
      }
    }
    
    // Mostrar contenido detallado si se solicita
    if (options.verbose) {
      console.log(chalk.blue('\n📄 Contenido detallado:\n'));
      console.log('='.repeat(60));
      
      for (const [filename, fileData] of Object.entries(files)) {
        console.log(chalk.yellow(`\n📄 ${filename}`));
        console.log(chalk.gray(`Última modificación: ${new Date(fileData.lastModified).toLocaleString()}`));
        console.log('='.repeat(60));
        console.log(fileData.content);
        console.log('='.repeat(60));
      }
    }
    
    // Generar y guardar contexto
    const context = await memoryBank.generateContext();
    const contextPath = path.join(memoryBank.memoryBankPath, '.context-cache.md');
    await fs.writeFile(contextPath, context, 'utf8');
    
    console.log(chalk.green('\n✅ Contexto generado y guardado en cache'));
    console.log(chalk.blue('💡 El contexto está listo para ser usado con Windsurf'));
    
  } catch (error) {
    console.error(chalk.red(`❌ Error leyendo Memory Bank: ${error.message}`));
    throw error;
  }
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'a few seconds ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

module.exports = { readCommand };
