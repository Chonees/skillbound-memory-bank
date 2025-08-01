const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');

// Archivos core requeridos del Memory Bank
const CORE_FILES = [
  'projectbrief.md',
  'productContext.md', 
  'activeContext.md',
  'systemPatterns.md',
  'techContext.md',
  'progress.md'
];

// Estructura de dependencias entre archivos
const FILE_DEPENDENCIES = {
  'projectbrief.md': [],
  'productContext.md': ['projectbrief.md'],
  'systemPatterns.md': ['projectbrief.md'],
  'techContext.md': ['projectbrief.md'],
  'activeContext.md': ['productContext.md', 'systemPatterns.md', 'techContext.md'],
  'progress.md': ['activeContext.md']
};

class MemoryBank {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.memoryBankPath = path.join(projectPath, 'memory-bank');
  }

  // Verificar si el Memory Bank está inicializado
  isInitialized() {
    return fs.existsSync(this.memoryBankPath);
  }

  // Obtener ruta completa de un archivo
  getFilePath(filename) {
    return path.join(this.memoryBankPath, filename);
  }

  // Verificar si todos los archivos core existen
  checkCoreFiles() {
    const missing = [];
    const existing = [];

    for (const file of CORE_FILES) {
      const filePath = this.getFilePath(file);
      if (fs.existsSync(filePath)) {
        existing.push(file);
      } else {
        missing.push(file);
      }
    }

    return { existing, missing };
  }

  // Leer un archivo específico
  async readFile(filename) {
    try {
      const filePath = this.getFilePath(filename);
      const content = await fs.readFile(filePath, 'utf8');
      const stats = await fs.stat(filePath);
      
      return {
        content,
        lastModified: stats.mtime,
        size: stats.size
      };
    } catch (error) {
      throw new Error(`Error leyendo ${filename}: ${error.message}`);
    }
  }

  // Leer todos los archivos del Memory Bank
  async readAllFiles() {
    const files = {};
    const { existing } = this.checkCoreFiles();

    for (const filename of existing) {
      try {
        files[filename] = await this.readFile(filename);
      } catch (error) {
        console.warn(chalk.yellow(`⚠️ No se pudo leer ${filename}: ${error.message}`));
      }
    }

    return files;
  }

  // Escribir contenido a un archivo
  async writeFile(filename, content) {
    try {
      const filePath = this.getFilePath(filename);
      
      // Agregar timestamp al final del contenido si no existe
      let finalContent = content;
      if (!content.includes('*Última actualización:')) {
        finalContent += `\n\n---\n*Creado: ${moment().format('YYYY-MM-DD HH:mm:ss')}*\n*Última actualización: ${moment().format('YYYY-MM-DD HH:mm:ss')}*`;
      } else {
        // Actualizar timestamp existente
        finalContent = content.replace(
          /\*Última actualización:.*?\*/,
          `*Última actualización: ${moment().format('YYYY-MM-DD HH:mm:ss')}*`
        );
      }
      
      await fs.writeFile(filePath, finalContent, 'utf8');
      
      console.log(chalk.green(`✓ ${filename} actualizado`));
      return true;
    } catch (error) {
      console.error(chalk.red(`Error escribiendo ${filename}:`), error.message);
      throw error;
    }
  }

  // Generar contexto completo para Windsurf
  async generateContext() {
    try {
      const files = await this.readAllFiles();
      let context = '';
      
      context += `# Windsurf Memory Bank Context\n`;
      context += `Generado: ${moment().format('YYYY-MM-DD HH:mm:ss')}\n`;
      context += `Proyecto: ${path.basename(this.projectPath)}\n\n`;

      // Agregar archivos en orden de dependencia
      for (const filename of CORE_FILES) {
        const file = files[filename];
        if (file) {
          context += `## ${filename}\n`;
          context += `Última modificación: ${moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss')}\n\n`;
          context += `${file.content}\n\n`;
          context += '='.repeat(60) + '\n\n';
        }
      }

      return context;
    } catch (error) {
      throw new Error(`Error generando contexto: ${error.message}`);
    }
  }

  // Obtener estadísticas del Memory Bank
  async getStats() {
    try {
      const { existing, missing } = this.checkCoreFiles();
      const files = {};

      for (const filename of existing) {
        const fileData = await this.readFile(filename);
        files[filename] = {
          size: fileData.size,
          lastModified: fileData.lastModified,
          lines: fileData.content.split('\n').length
        };
      }

      return {
        totalFiles: existing.length,
        missingFiles: missing.length,
        files,
        isComplete: missing.length === 0
      };
    } catch (error) {
      throw new Error(`Error obteniendo estadísticas: ${error.message}`);
    }
  }

  // Validar integridad de archivos
  async validateIntegrity() {
    const issues = [];
    
    try {
      const files = await this.readAllFiles();
      
      // Verificar que cada archivo tenga contenido mínimo
      for (const [filename, fileData] of Object.entries(files)) {
        if (fileData.content.trim().length < 50) {
          issues.push(`${filename}: Contenido muy corto (menos de 50 caracteres)`);
        }
        
        if (!fileData.content.includes('#')) {
          issues.push(`${filename}: No contiene encabezados Markdown`);
        }
      }

      // Verificar dependencias conceptuales
      if (files['activeContext.md'] && !files['activeContext.md'].content.includes('Current work focus')) {
        issues.push('activeContext.md: Falta sección "Current work focus"');
      }

      if (files['progress.md'] && !files['progress.md'].content.includes('What works')) {
        issues.push('progress.md: Falta sección "What works"');
      }

      return {
        isValid: issues.length === 0,
        issues
      };
    } catch (error) {
      return {
        isValid: false,
        issues: [`Error de validación: ${error.message}`]
      };
    }
  }

  // Buscar archivos adicionales en el Memory Bank
  async findAdditionalFiles() {
    try {
      const allFiles = await fs.readdir(this.memoryBankPath);
      const additionalFiles = allFiles.filter(file => 
        !CORE_FILES.includes(file) && 
        file.endsWith('.md') && 
        !file.startsWith('.') &&
        file !== 'README.md'
      );
      
      return additionalFiles;
    } catch (error) {
      return [];
    }
  }
}

module.exports = {
  MemoryBank,
  CORE_FILES,
  FILE_DEPENDENCIES
};
