
export const inputName = (e, set) => {
  if (e.key === 'Enter') {
    set(e.target.value)
  }
}
