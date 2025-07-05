# Figma Variables Broken Reference Checker

A Figma plugin that scans your design tokens and identifies broken variable references across primitive, semantic, and component variables.

## What it Does

This plugin helps you maintain a clean design system by detecting when variables reference other variables that no longer exist. It's particularly useful for:

- **Design System Maintenance**: Find and fix broken references after reorganizing variables
- **Team Collaboration**: Ensure all team members are using valid variable references
- **Quality Assurance**: Prevent broken references from reaching production

## Features

- **Comprehensive Scanning**: Checks all variable types (primitive, semantic, component)
- **Theme-Aware**: Shows which theme/mode has the broken reference
- **Detailed Information**: Displays variable names, IDs, and referenced variable names
- **User-Friendly UI**: Clear, organized results with filtering by variable type

## How to Use

1. **Install the Plugin**: Add it to your Figma plugins
2. **Run the Scan**: Execute the plugin in any Figma document with variables
3. **Review Results**: The plugin will show all broken references with detailed information
4. **Fix Issues**: Use the information provided to recreate missing variables or update references

## Output Format

The plugin provides detailed information for each broken reference:

```
Variable Name: components/button/primary/background
Error: Variable references non-existent variable "primitive/colors/blue" (ID: VariableID:1234:5678) in theme "Dark"
Broken Reference: primitive/colors/blue (ID: VariableID:1234:5678)
Theme: Dark
```

## Development

This plugin is built with TypeScript and follows Figma's plugin development best practices.

### Setup

1. Install dependencies: `npm install`
2. Start development: `npm run watch`
3. Build for production: `npm run build`

### Scripts

- `npm run build` - Build the plugin
- `npm run watch` - Watch for changes and rebuild
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## License

This project is licensed under the MIT License. 