# Figma Variables Broken Reference Checker

A Figma plugin that scans your design tokens and identifies broken variable references across any variable collection structure.

## What it Does

This plugin helps you maintain a clean design system by detecting when variables reference other variables that no longer exist. It's particularly useful for:

- **Design System Maintenance**: Find and fix broken references after reorganizing variables
- **Team Collaboration**: Ensure all team members are using valid variable references
- **Quality Assurance**: Prevent broken references from reaching production
- **Universal Compatibility**: Works with any variable naming convention or collection structure

## Features

- **Universal Scanning**: Checks all variables regardless of naming conventions or collection structure
- **Collection-Based Grouping**: Results are organized by variable collection for easy navigation
- **Theme-Aware**: Shows which theme/mode has the broken reference
- **Detailed Information**: Displays variable names, IDs, and referenced variable names
- **User-Friendly UI**: Clear, organized results with filtering by collection

## How to Use

1. **Install the Plugin**: Add it to your Figma plugins
2. **Run the Scan**: Execute the plugin in any Figma document with variables
3. **Review Results**: The plugin will show all broken references organized by collection
4. **Fix Issues**: Use the information provided to recreate missing variables or update references

## Output Format

The plugin provides detailed information for each broken reference:

```
Collection: Design Tokens
Variable Name: button/primary/background
Error: Variable references non-existent variable "colors/blue" (ID: VariableID:1234:5678) in theme "Dark"
Broken Reference: colors/blue (ID: VariableID:1234:5678)
Theme: Dark
```

## Universal Compatibility

Unlike other plugins that require specific naming conventions, this plugin works with:
- Any variable naming structure (primitive/semantic/component, tokens/atoms/molecules, or custom naming)
- Any number of variable collections
- Any theme/mode structure
- Any variable reference depth

## Plugin Distribution Management

This codebase manages both organization and community versions of the plugin using separate manifest files:

### Manifest Files

- **`manifest.json`** - Currently active manifest (switches between versions)
- **`manifest.organization.json`** - Organization version with original ID
- **`manifest.community.json`** - Community version with unique ID

### Switching Between Versions

**To use the Community version:**
```bash
cp manifest.community.json manifest.json
```

**To use the Organization version:**
```bash
cp manifest.organization.json manifest.json
```

### Version Differences

| Version | Name | ID | Purpose |
|---------|------|----|---------|
| Organization | "Broken Variable Reference Checker" | 1522943800002296763 | Internal company use |
| Community | "Broken Variable Reference Checker (Community)" | 1522943800999999999 | Public Figma Community |

### Workflow

1. **Development**: Make changes to the code (both versions share the same codebase)
2. **Testing**: Switch to the appropriate manifest and test in Figma
3. **Publishing**: 
   - Organization: Use `manifest.organization.json` for internal distribution
   - Community: Use `manifest.community.json` for Figma Community publishing

### Why This Approach?

- **Single Codebase**: Both versions share the same functionality and updates
- **Unique IDs**: Prevents conflicts between organization and community installations
- **Clear Naming**: Users can distinguish between versions in their plugin manager
- **Easy Switching**: Simple file copy operations to switch between versions

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