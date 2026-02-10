import { useState } from "react";
import IntegerInput from "../ui/IntegerInput";
import { drawNumbers, drawNumbersWithoutRepetition } from "../../utils/draw";

export default function Main() {
  const [amountInput, setAmountInput] = useState("1");
  const [minInput, setMinInput] = useState("1");
  const [maxInput, setMaxInput] = useState("10");
  const [allowRepeated, setAllowRepeated] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");

  const forceAllowRepeated =
    parseInt(amountInput) > parseInt(maxInput) - parseInt(minInput) + 1;

  const sortedResults =
    sort === "none"
      ? results
      : [...results].sort((a, b) => (sort === "asc" ? a - b : b - a));

  const getNumbers = () => {
    const amount = parseInt(amountInput);
    const min = parseInt(minInput);
    const max = parseInt(maxInput);

    if (allowRepeated || forceAllowRepeated) {
      setResults(drawNumbers(amount, min, max));
    } else {
      setResults(drawNumbersWithoutRepetition(amount, min, max));
    }
  };

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
        onClick={getNumbers}
        className="bg-surface-orange w-full text-2xl font-bold py-2 rounded-xl cursor-pointer"
      >
        Draw
      </button>
      {results.length > 0 && (
        <div className="space-y-6">
          <p className="text-center text-3xl">Results</p>
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
            {sortedResults.map((n, i) => (
              <div
                key={i}
                className="text-2xl font-medium flex items-center justify-evenly rounded-full px-5 h-15 bg-surface"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
