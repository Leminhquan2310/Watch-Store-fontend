import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectCount } from "../../redux/counter/counterSelectors";
import { decrement, increment } from "../../redux/counter/counterActions";

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Count: {count}</h3>
      <Button onClick={() => dispatch(increment())}>Increment 1</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement 1</Button>
    </div>
  );
}

export default Counter;
