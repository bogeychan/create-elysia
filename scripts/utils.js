/**
 * @param {any} error
 */
export function exitOnError(error) {
  //   logUsage();
  console.error(`❌ Something went wrong :(\n\n`, error);
  process.exit(1);
}

/**
 * @param {string} tempalte
 */
export function exitOnMissingTemplate(tempalte) {
  // logUsage();
  console.error(`❌ Template "${tempalte}" doesn't exist :(`);
  process.exit(1);
}
