import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import utilsPackageJson from 'embla-carousel-reactive-utils/package.json'
import emblaPackageJson from 'embla-carousel/package.json'
import fs from 'fs'
import path from 'path'

const FOLDERS = {
  ESM: 'esm',
  CJS: 'cjs',
  UMD: 'umd',
  OUT: './'
}

const CONFIG_GLOBALS = {
  [formatName(emblaPackageJson.name)]: kebabToPascalCase(
    formatName(emblaPackageJson.name)
  ),
  [formatName(utilsPackageJson.name)]: kebabToPascalCase(
    formatName(utilsPackageJson.name)
  )
}

const CONFIG_EXTERNAL_MODULES = {
  moduleDirectories: ['node_modules', formatName(utilsPackageJson.name)]
}

const CONFIG_BABEL = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled'
}

const CONFIG_TYPESCRIPT = {
  tsconfig: path.join(__dirname, 'tsconfig.json')
}

function CONFIG_EXTERNAL_MODULE_SUPPRESS(warning, next) {
  if (warning.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') return
  next(warning)
}

function kebabToPascalCase(string = '') {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, '').toUpperCase()
  )
}

function createBuildPath(packageJson, format) {
  const fileName = `${formatName(packageJson.name)}.${format}.js`
  if (format === 'umd') return path.join(FOLDERS.OUT, fileName)
  return path.join(FOLDERS.OUT, format, fileName)
}

function formatName(name) {
  return name.replace('@fethcat/', '')
}

function createNodeNextSupportForPackage() {
  const workspacePath = process.cwd()
  const packageJsonPath = path.join(workspacePath, 'package.json')
  const workspacePackageJson = fs.readFileSync(packageJsonPath, 'utf-8')

  if (!workspacePackageJson) return

  const outFolder = path.join(workspacePath, FOLDERS.OUT)
  const esmFolder = path.join(workspacePath, FOLDERS.OUT, FOLDERS.ESM)
  const cjsFolder = path.join(workspacePath, FOLDERS.OUT, FOLDERS.CJS)

  const packageJson = JSON.parse(workspacePackageJson)
  const packageJsonMain = {
    ...packageJson,
    repository: {
      type: 'git',
      url: 'git+https://github.com/davidjerleke/embla-carousel'
    },
    bugs: {
      url: 'https://github.com/davidjerleke/embla-carousel/issues'
    },
    homepage: 'https://www.embla-carousel.com',
    license: 'MIT',
    keywords: [
      'slider',
      'carousel',
      'slideshow',
      'gallery',
      'lightweight',
      'touch',
      'javascript',
      'typescript',
      'react',
      'vue',
      'svelte',
      'solid'
    ],
    files: [
      `${formatName(packageJson.name)}*`,
      'components/**/*',
      'index.d.ts',
      'esm/**/*',
      'cjs/**/*'
    ],
    sideEffects: false,
    unpkg: `${formatName(packageJson.name)}.umd.js`,
    main: `${formatName(packageJson.name)}.umd.js`,
    module: `./${FOLDERS.ESM}/${formatName(packageJson.name)}.${
      FOLDERS.ESM
    }.js`,
    types: 'index.d.ts',
    exports: {
      './package.json': './package.json',
      '.': {
        import: {
          types: `./${FOLDERS.ESM}/index.d.ts`,
          default: `./${FOLDERS.ESM}/${formatName(packageJson.name)}.${
            FOLDERS.ESM
          }.js`
        },
        require: {
          types: `./${FOLDERS.CJS}/index.d.ts`,
          default: `./${FOLDERS.CJS}/${formatName(packageJson.name)}.${
            FOLDERS.CJS
          }.js`
        }
      }
    }
  }

  const propsToDelete = ['scripts', 'exports', 'main', 'unpkg', 'module']
  propsToDelete.forEach((prop) => delete packageJson[prop])

  const files = [
    `${formatName(packageJson.name)}*`,
    'components/**/*',
    'index.d.ts'
  ]
  const packageJsonEsm = {
    ...packageJson,
    module: `${formatName(packageJson.name)}.${FOLDERS.ESM}.js`,
    files,
    type: 'module'
  }
  const packageJsonCjs = {
    ...packageJson,
    main: `${formatName(packageJson.name)}.${FOLDERS.CJS}.js`,
    files,
    type: 'commonjs'
  }

  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder)
  if (!fs.existsSync(esmFolder)) fs.mkdirSync(esmFolder)
  if (!fs.existsSync(cjsFolder)) fs.mkdirSync(cjsFolder)

  fs.writeFileSync(
    path.join(outFolder, 'package.json'),
    JSON.stringify(packageJsonMain, null, '\t')
  )

  fs.writeFileSync(
    path.join(esmFolder, 'package.json'),
    JSON.stringify(packageJsonEsm, null, '\t')
  )

  fs.writeFileSync(
    path.join(cjsFolder, 'package.json'),
    JSON.stringify(packageJsonCjs, null, '\t')
  )

  const esmTypesFilePath = `${esmFolder}/index.d.ts`
  const esmTypesFile = fs.readFileSync(esmTypesFilePath, 'utf-8')
  const esmTypesFileWithExtensions = esmTypesFile.replace(
    /from\s'(.*)';/g,
    (match) => match.replace(/';/g, `.ts';`)
  )
  fs.writeFileSync(esmTypesFilePath, esmTypesFileWithExtensions)
}

function createNodeNextSupport() {
  return {
    name: 'createNodeNextSupport',
    closeBundle: createNodeNextSupportForPackage
  }
}

export {
  CONFIG_BABEL,
  CONFIG_EXTERNAL_MODULES,
  CONFIG_EXTERNAL_MODULE_SUPPRESS,
  CONFIG_GLOBALS,
  CONFIG_TYPESCRIPT,
  FOLDERS,
  babel,
  createBuildPath,
  createNodeNextSupport,
  formatName,
  kebabToPascalCase,
  resolve,
  terser,
  typescript
}
