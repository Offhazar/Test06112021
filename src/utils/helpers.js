export function findByiId(state, id) {
  return state.items.find((item) => item.id === id);
}
