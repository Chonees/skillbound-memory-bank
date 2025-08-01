#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');

// Import commands
const { initCommand } = require('../lib/commands/init');
const { readCommand } = require('../lib/commands/read');
const { updateCommand } = require('../lib/commands/update');
const { statusCommand } = require('../lib/commands/status');
const { runCommand } = require('../lib/commands/run');
const { execute: analyzeCommand } = require('../lib/commands/analyze');

// Configuración del programa principal
program
  .name('windsurf-memory')
  .description('CLI para Windsurf con sistema Memory Bank que mantiene contexto entre sesiones')
  .version('1.0.0');

// Comando: init - Inicializar el banco de memoria
program
  .command('init')
  .description('Inicializar el banco de memoria para un proyecto')
  .argument('[proyecto]', 'Nombre del proyecto (opcional)')
  .option('-f, --force', 'Sobrescribir archivos existentes')
  .option('--path <path>', 'Ruta personalizada para el Memory Bank')
  .action(async (proyecto, options) => {
    try {
      await initCommand(proyecto, options);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Comando: read - Leer todos los archivos del Memory Bank
program
  .command('read')
  .description('Leer todos los archivos del Memory Bank (obligatorio al inicio de cada sesión)')
  .option('-v, --verbose', 'Mostrar contenido detallado')
  .option('-s, --summary', 'Mostrar solo resumen')
  .option('--path <path>', 'Ruta personalizada para el Memory Bank')
  .action(async (options) => {
    try {
      await readCommand(options);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Comando: update - Actualizar archivos del Memory Bank
program
  .command('update')
  .description('Actualizar archivos del Memory Bank')
  .argument('[archivo]', 'Archivo específico a actualizar (opcional)')
  .option('-a, --all', 'Actualizar todos los archivos')
  .option('-i, --interactive', 'Modo interactivo')
  .option('--path <path>', 'Ruta personalizada para el Memory Bank')
  .action(async (archivo, options) => {
    try {
      await updateCommand(archivo, options);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Comando: status - Verificar estado del contexto
program
  .command('status')
  .description('Verificar el estado actual del contexto y archivos del Memory Bank')
  .option('-c, --check', 'Verificar integridad de archivos')
  .option('--path <path>', 'Ruta personalizada para el Memory Bank')
  .action(async (options) => {
    try {
      await statusCommand(options);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Comando: run - Ejecutar comando con contexto
program
  .command('run')
  .description('Ejecutar un comando de Windsurf con contexto del Memory Bank')
  .argument('<comando>', 'Comando a ejecutar')
  .option('-c, --context', 'Incluir contexto completo')
  .option('--path <path>', 'Ruta personalizada para el Memory Bank')
  .action(async (comando, options) => {
    try {
      await runCommand(comando, options);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Comando: analyze - Analizar código y actualizar Memory Bank automáticamente
program
  .command('analyze')
  .description('Analizar automáticamente el código y actualizar el Memory Bank')
  .option('-d, --deep', 'Realizar análisis profundo de componentes y patrones')
  .option('-v, --verbose', 'Mostrar información detallada durante el análisis')
  .option('--path <path>', 'Ruta personalizada para el Memory Bank')
  .action(async (options) => {
    try {
      await analyzeCommand(options);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Manejo de errores globales
program.exitOverride();

try {
  program.parse();
} catch (err) {
  console.error(chalk.red('Error:'), err.message);
  process.exit(1);
}

// Si no se proporciona ningún comando, mostrar ayuda
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
