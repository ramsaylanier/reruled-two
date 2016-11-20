
// check for existing ruleset when creating a ruleset during mutation and
// subscriptions. If not, we get a duplicate child error from React

export function isDuplicateRuleset (newRuleset, existingRulesets) {
  if (!existingRulesets) {
    return false
  }

  return newRuleset.id !== null && existingRulesets.some(ruleset => newRuleset.id === ruleset.id)
}
