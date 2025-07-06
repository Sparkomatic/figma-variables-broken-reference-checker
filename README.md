# Broken Variable Reference Checker

A Figma plugin that scans your design tokens and identifies broken variable references across any variable collection structure.

## ⚠️ Disclaimer

**This plugin is provided "as is" without any warranties. Use at your own risk.**

- The plugin only **reads** your Figma variables and does not modify any data
- Always backup your work before using any plugin
- The authors are not responsible for any data loss or issues that may occur
- Test the plugin on a copy of your file first if you're concerned about data integrity

## 🎯 What it Does

This plugin helps you maintain a clean design system by detecting when variables reference other variables that no longer exist. It's particularly useful for:

- **Design System Maintenance**: Find and fix broken references after reorganizing variables
- **Team Collaboration**: Ensure all team members are using valid variable references
- **Quality Assurance**: Prevent broken references from reaching production
- **Universal Compatibility**: Works with any variable naming convention or collection structure

## ✨ Features

- **Universal Scanning**: Checks all variables regardless of naming conventions or collection structure
- **Collection-Based Grouping**: Results are organized by variable collection for easy navigation
- **Theme-Aware**: Shows which theme/mode has the broken reference
- **Detailed Information**: Displays variable names, IDs, and referenced variable names
- **User-Friendly UI**: Clear, organized results with filtering by collection
- **Read-Only**: Only scans and reports - never modifies your data

## 🚀 How to Use

1. **Install the Plugin**: Add it to your Figma plugins
2. **Run the Scan**: Execute the plugin in any Figma document with variables
3. **Review Results**: The plugin will show all broken references organized by collection
4. **Fix Issues**: Use the information provided to recreate missing variables or update references

## 📋 Output Format

The plugin provides detailed information for each broken reference:

```
Collection: Design Tokens
Variable Name: button/primary/background
Error: Variable references non-existent variable "colors/blue" (ID: VariableID:1234:5678) in theme "Dark"
Broken Reference: colors/blue (ID: VariableID:1234:5678)
Theme: Dark
```

## 🌍 Universal Compatibility

Unlike other plugins that require specific naming conventions, this plugin works with:
- Any variable naming structure (primitive/semantic/component, tokens/atoms/molecules, or custom naming)
- Any number of variable collections
- Any theme/mode structure
- Any variable reference depth

## 🛠️ Development

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for the Figma community** 