/// <reference types="@figma/plugin-typings" />

// Figma Variables Broken Reference Checker
// This plugin checks for broken variable references across any variable collection structure

interface BrokenReference {
  variableName: string;
  variableId: string;
  brokenReference: string;
  referencedVariableName: string;
  themeName: string;
  collectionName: string;
  error: string;
}

// Get all variables from the document
async function getAllVariables(): Promise<Variable[]> {
  const variables: Variable[] = [];
  
  // Get all variable collections
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  
  for (const collection of collections) {
    // Get variables in this collection
    const collectionVariables = await figma.variables.getLocalVariablesAsync();
    const filteredVariables = collectionVariables.filter(variable => 
      variable.variableCollectionId === collection.id
    );
    variables.push(...filteredVariables);
  }
  
  return variables;
}

// Create a map of all variable IDs for quick lookup
function createVariableIdMap(variables: Variable[]): Map<string, Variable> {
  const variableMap = new Map<string, Variable>();
  
  for (const variable of variables) {
    variableMap.set(variable.id, variable);
  }
  
  return variableMap;
}

// Check if a variable reference is broken
async function checkVariableReference(
  variable: Variable, 
  variableIdMap: Map<string, Variable>,
  collections: VariableCollection[]
): Promise<BrokenReference[]> {
  const brokenRefs: BrokenReference[] = [];
  
  // Find the collection this variable belongs to
  const collection = collections.find(col => col.id === variable.variableCollectionId);
  
  // Check each mode's values for variable references
  for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
    // Check if the value is a variable alias (reference to another variable)
    // VariableAlias has 'type' and 'id' properties, while RGB/RGBA don't
    if (typeof value === 'object' && value !== null && 'type' in value && 'id' in value && value.type === 'VARIABLE_ALIAS') {
      // Check if the referenced variable still exists
      if (!variableIdMap.has(value.id)) {
        // Try to get the variable name if it still exists (might have been moved/renamed)
        let referencedVariableName = 'Unknown';
        try {
          const referencedVar = await figma.variables.getVariableByIdAsync(value.id);
          if (referencedVar) {
            referencedVariableName = referencedVar.name;
          }
        } catch (error) {
          // Variable doesn't exist, keep as 'Unknown'
        }
        
        // Get the mode/theme name
        let modeName = modeId;
        if (collection) {
          const mode = collection.modes.find(m => m.modeId === modeId);
          if (mode) {
            modeName = mode.name;
          }
        }
        
        brokenRefs.push({
          variableName: variable.name,
          variableId: variable.id,
          brokenReference: value.id,
          referencedVariableName,
          themeName: modeName,
          collectionName: collection ? collection.name : 'Unknown Collection',
          error: `Variable references non-existent variable "${referencedVariableName}" (ID: ${value.id}) in theme "${modeName}"`
        });
      }
    }
  }
  
  return brokenRefs;
}

// Main function to check all variables
async function checkAllVariables(): Promise<BrokenReference[]> {
  const allVariables = await getAllVariables();
  const variableIdMap = createVariableIdMap(allVariables);
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  
  const allBrokenRefs: BrokenReference[] = [];
  
  // Check all variables regardless of their naming convention
  for (const variable of allVariables) {
    const brokenRefs = await checkVariableReference(variable, variableIdMap, collections);
    allBrokenRefs.push(...brokenRefs);
  }
  
  return allBrokenRefs;
}

// Display results in UI
function displayResults(brokenRefs: BrokenReference[]) {
  figma.ui.postMessage({
    type: 'scan-complete',
    brokenRefs: brokenRefs
  });
  
  // Also log to console for debugging
  console.log('Broken Variable References:', brokenRefs);
}

// Show the UI
figma.showUI(__html__, { width: 400, height: 600 });

// Handle UI messages
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'start-scan' || msg.type === 'retry-scan') {
    try {
      const brokenRefs = await checkAllVariables();
      displayResults(brokenRefs);
    } catch (error: any) {
      figma.ui.postMessage({
        type: 'scan-error',
        error: error.message
      });
      console.error('Error:', error);
    }
  }
};

// Start initial scan
figma.ui.postMessage({ type: 'start-scan' }); 