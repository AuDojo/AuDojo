/**
 * Updates the value of a mutable variable.
 * @param currentValue The current value of the mutable variable.
 * @param newValue The new value to set.
 */
export function updateValue<T>(currentValue: T, newValue: T) {
  currentValue = newValue;
}
