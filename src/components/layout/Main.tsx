import { useEffect, useRef, useState } from "react";
import IntegerInput from "../ui/IntegerInput";
import useLocalStorage from "../../hooks/useLocalStorage";
import Number from "../ui/Number";
import ActionButton from "../ui/ActionButton";
import { pickNumbers, pickNumbersWithoutRepetition } from "../../utils/pick";
import { IoCopyOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

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
  const [copied, setCopied] = useState(false);
  const copiedRef = useRef<number | null>(null);

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

  const handlePick = () => {
    let min, max;

    if (minRaw < maxRaw) {
      min = minRaw;
      max = maxRaw;
    } else {
      min = maxRaw;
      max = minRaw;
    }

    if (forceAllowRepeated || allowRepeated) {
      setResult(pickNumbers(amount, min, max));
    } else {
      setResult(pickNumbersWithoutRepetition(amount, min, max));
    }
  };

  const handleCopyResults = async () => {
    await navigator.clipboard.writeText(sortedResult.join(", "));

    setCopied(true);
    copiedRef.current = setTimeout(() => {
      setCopied(false);
      copiedRef.current = null;
    }, 2000);
  };

  const handleResetInputs = () => {
    setAmountInput("1");
    setMinInput("1");
    setMaxInput("10");
    setAllowRepeated(false);
  };

  const handleClearResults = () => {
    setResult([]);
  };

  useEffect(() => {
    return () => {
      if (copiedRef.current) {
        clearTimeout(copiedRef.current);
      }
    };
  }, []);

  return (
    <main className="max-w-3xl mx-auto py-8 px-4 space-y-10">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center gap-4 text-3xl">
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
      <div className="md:hidden flex flex-col gap-2 text-2xl">
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
      <div className="flex flex-row md:items-center md:justify-between gap-4">
        <label htmlFor="allowRepeated" className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={forceAllowRepeated || allowRepeated}
            onChange={(e) => setAllowRepeated(e.target.checked)}
            disabled={forceAllowRepeated}
            id="allowRepeated"
            className="w-5 h-5 accent-surface-orange cursor-pointer disabled:cursor-not-allowed"
          />
          <span>Allow repeated numbers</span>
        </label>
        <ActionButton action={handleResetInputs}>
          <RxReset size={14} /> RESET INPUTS
        </ActionButton>
      </div>
      <button
        onClick={handlePick}
        className="hover:scale-102 active:scale-100 transition shadow-surface text-white text-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-surface-orange w-full text-2xl font-bold py-2 rounded-xl cursor-pointer"
      >
        Pick
      </button>
      {result.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <p className="text-center text-2xl">Results</p>
            <ActionButton action={handleClearResults}>
              <FaRegTrashAlt size={14} /> CLEAR RESULTS
            </ActionButton>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-4">
              <span className="font-bold">Sort order:</span>
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
            <ActionButton action={handleCopyResults} disabled={copied}>
              {copied ? (
                <>
                  <FaCheck size={14} /> COPIED!
                </>
              ) : (
                <>
                  <IoCopyOutline size={14} />
                  COPY
                </>
              )}
            </ActionButton>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {sortedResult.map((n, i) => (
              <Number key={i} number={n} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
