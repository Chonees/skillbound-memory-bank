const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { MemoryBank } = require('../utils/memoryBank');

async function statusCommand(options = {}) {
  try {
    console.log(chalk.blue('🔍 Verificando estado del Memory Bank...'));
    
    // Determinar la ruta del Memory Bank
    const projectPath = options.path ? path.dirname(options.path) : process.cwd();
    const memoryBankPath = options.path || path.join(projectPath, 'memory-bank');
    
    const memoryBank = new MemoryBank(projectPath);
    
    // Si se especifica una ruta personalizada, actualizar la ruta del Memory Bank
    if (options.path) {
      memoryBank.memoryBankPath = memoryBankPath;
    }
    
    // Verificar inicialización
    if (!memoryBank.isInitialized()) {
      console.log(chalk.red('❌ Memory Bank no está inicializado'));
      console.log(chalk.yellow('💡 Ejecuta: windsurf-memory init'));
      return;
    }
    
    console.log(chalk.green('✅ Memory Bank inicializado'));
    
    // Verificar archivos core
    const { existing, missing } = memoryBank.checkCoreFiles();
    
    if (missing.length === 0) {
      console.log(chalk.green(`✅ Todos los archivos core presentes (${existing.length})`));
    } else {
      console.log(chalk.yellow(`⚠️ Archivos core faltantes: ${missing.join(', ')}`));
    }
    
    // Obtener estadísticas
    if (existing.length > 0) {
      const stats = await memoryBank.getStats();
      
      console.log(chalk.blue('\n📊 Estadísticas:'));
      console.log(`Total de archivos: ${stats.totalFiles}`);
      console.log(`Estado: ${stats.isComplete ? 'Completo' : 'Incompleto'}`);
      
      // Mostrar detalles de archivos
      console.log(chalk.blue('\n📁 Archivos core:'));
      for (const [filename, fileStats] of Object.entries(stats.files)) {
        const size = (fileStats.size / 1024).toFixed(1);
        const status = fileStats.size > 100 ? '✅' : '⚠️';
        console.log(`  ${status} ${filename}: ${size}KB, ${fileStats.lines} líneas`);
      }
    }
    
    // Verificar integridad si se solicita
    if (options.check && existing.length > 0) {
      console.log(chalk.blue('\n🔍 Verificando integridad...'));
      const integrity = await memoryBank.validateIntegrity();
      
      if (integrity.isValid) {
        console.log(chalk.green('✅ Integridad verificada'));
      } else {
        console.log(chalk.yellow('⚠️ Problemas de integridad encontrados:'));
        integrity.issues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
      }
    }
    
    // Buscar archivos adicionales
    const additionalFiles = await memoryBank.findAdditionalFiles();
    if (additionalFiles.length > 0) {
      console.log(chalk.blue('\n📄 Archivos adicionales:'));
      additionalFiles.forEach(file => {
        console.log(`  📄 ${file}`);
      });
    }
    
    // Verificar cache de contexto
    const contextCachePath = path.join(memoryBank.memoryBankPath, '.context-cache.md');
    if (await fs.pathExists(contextCachePath)) {
      const cacheStats = await fs.stat(contextCachePath);
      const cacheAge = Math.floor((Date.now() - cacheStats.mtime.getTime()) / 60000);
      console.log(chalk.blue(`\n💾 Cache de contexto: ${cacheAge} minutos de antigüedad`));
    } else {
      console.log(chalk.yellow('\n⚠️ No hay cache de contexto generado'));
    }
    
    // Recomendaciones
    console.log(chalk.blue('\n💡 Recomendaciones:'));
    
    if (missing.length > 0) {
      console.log('  - Ejecuta `windsurf-memory update --all` para crear archivos faltantes');
    }
    
    if (existing.length > 0) {
      const oldFiles = existing.filter(file => {
        const filePath = path.join(memoryBank.memoryBankPath, file);
        try {
          const stats = fs.statSync(filePath);
          const ageHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
          return ageHours > 24;
        } catch {
          return false;
        }
      });
      
      if (oldFiles.length > 0) {
        console.log('  - Algunos archivos tienen más de 24 horas, considera actualizarlos');
      }
    }
    
    if (!await fs.pathExists(contextCachePath)) {
      console.log('  - Ejecuta `windsurf-memory read` para generar el cache de contexto');
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error verificando estado: ${error.message}`));
    throw error;
  }
}

module.exports = { statusCommand };
