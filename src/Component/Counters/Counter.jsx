import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../Redux/Slice/counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  console.log(count, "Count")
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>
          {count}
          Count
          </span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
