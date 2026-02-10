// made by chatGPT
export function drawNumbersWithoutRepetition(
  amount: number,
  min: number,
  max: number,
) {
  const map = new Map();
  const result = [];

  for (let i = 0; i < amount; i++) {
    const r = Math.floor(Math.random() * (max - min + 1 - i)) + min;

    const val = map.get(r) ?? r;

    const last = max - i;
    map.set(r, map.get(last) ?? last);

    result.push(val);
  }

  return result;
}

export function drawNumbers(amount: number, min: number, max: number) {
  let result = [];

  for (let i = 0; i < amount; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return result;
}
