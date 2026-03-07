import IntegerInput from "../ui/IntegerInput";
import { drawNumbers, drawNumbersWithoutRepetition } from "../../utils/draw";
import useLocalStorage from "../../hooks/useLocalStorage";
import Number from "../ui/Number";

export default function Main() {
  const [amountInput, setAmountInput] = useLocalStorage("draw:amount", "1");
  const [minInput, setMinInput] = useLocalStorage("draw:min", "1");
  const [maxInput, setMaxInput] = useLocalStorage("draw:max", "10");
  const [allowRepeated, setAllowRepeated] = useLocalStorage(
    "draw:allow_repeated",
    false,
  );
  const [result, setResult] = useLocalStorage<number[]>("draw:result", []);
  const [sort, setSort] = useLocalStorage<"none" | "asc" | "desc">(
    "draw:sort",
    "none",
  );

  const amount = parseInt(amountInput);
  const minRaw = parseInt(minInput);
  const maxRaw = parseInt(maxInput);

  const forceAllowRepeated =
    minRaw > maxRaw
      ? amount > minRaw - maxRaw + 1
      : amount > maxRaw - minRaw + 1;

  const sortedResult =
    sort === "none"
      ? result
      : [...result].sort((a, b) => (sort === "asc" ? a - b : b - a));

  const pick = () => {
    let min, max;

    if (minRaw < maxRaw) {
      min = minRaw;
      max = maxRaw;
    } else {
      min = maxRaw;
      max = minRaw;
    }

    if (allowRepeated || forceAllowRepeated) {
      setResult(drawNumbers(amount, min, max));
    } else {
      setResult(drawNumbersWithoutRepetition(amount, min, max));
    }
  };

  // const resetInputs = () => {
  //   setAmountInput("1");
  //   setMinInput("1");
  //   setMaxInput("10");
  //   setAllowRepeated(false);
  // };

  return (
    <main className="max-w-3xl mx-auto py-8 px-4 space-y-10">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between text-3xl">
        <span>Pick</span>
        <IntegerInput
          value={amountInput}
          setValue={setAmountInput}
          onlyPositiveNumbers
          defaultValue="1"
        />
        <span>numbers,</span>
        <span>between</span>
        <IntegerInput
          value={minInput}
          setValue={setMinInput}
          defaultValue="1"
        />
        <span>and</span>
        <IntegerInput
          value={maxInput}
          setValue={setMaxInput}
          defaultValue="10"
        />
      </div>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-5 text-3xl">
        <div className="flex items-center gap-4">
          <span>Pick</span>
          <IntegerInput
            value={amountInput}
            setValue={setAmountInput}
            onlyPositiveNumbers
            defaultValue="1"
          />
          <span>numbers,</span>
        </div>
        <div className="flex items-center gap-4">
          <span>between</span>
          <IntegerInput
            value={minInput}
            setValue={setMinInput}
            defaultValue="1"
          />
          <span>and</span>
          <IntegerInput
            value={maxInput}
            setValue={setMaxInput}
            defaultValue="10"
          />
        </div>
      </div>
      <div>
        <label htmlFor="allowRepeated" className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={allowRepeated || forceAllowRepeated}
            onChange={(e) => setAllowRepeated(e.target.checked)}
            disabled={forceAllowRepeated}
            id="allowRepeated"
            className="w-5 h-5 accent-surface-orange cursor-pointer disabled:cursor-not-allowed"
          />
          <span>Allow repeated numbers</span>
        </label>
      </div>
      <button
        onClick={pick}
        className="bg-surface-orange w-full text-2xl font-bold py-2 rounded-xl cursor-pointer"
      >
        Pick
      </button>
      {result.length > 0 && (
        <div className="space-y-6">
          <p className="text-center text-2xl">Results</p>
          <div className="flex items-center gap-4">
            <span>Sort order:</span>
            <label
              htmlFor="none"
              className="flex items-center gap-1 text-sm cursor-pointer"
            >
              <input
                type="radio"
                value="none"
                checked={sort === "none"}
                onChange={() => setSort("none")}
                name="sort"
                id="none"
                className="accent-surface-orange w-4 h-4 cursor-pointer"
              />
              <span>Draw</span>
            </label>
            <label
              htmlFor="asc"
              className="flex items-center gap-1 text-sm cursor-pointer"
            >
              <input
                type="radio"
                value="asc"
                checked={sort === "asc"}
                onChange={() => setSort("asc")}
                name="sort"
                id="asc"
                className="accent-surface-orange w-4 h-4 cursor-pointer"
              />
              <span>Ascending</span>
            </label>
            <label
              htmlFor="desc"
              className="flex items-center gap-1 text-sm cursor-pointer"
            >
              <input
                type="radio"
                value="desc"
                checked={sort === "desc"}
                onChange={() => setSort("desc")}
                name="sort"
                id="desc"
                className="accent-surface-orange w-4 h-4 cursor-pointer"
              />
              <span>Descending</span>
            </label>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {sortedResult.map((n, i) => (
              <Number key={i} number={n} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
