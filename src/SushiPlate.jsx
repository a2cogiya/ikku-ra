import { useState } from 'react';
import './SushiPlate.css';

export default function SushiPlate() {
  const [maxId, setMaxId] = useState(1);
  const [plateVal, setPlateVal] = useState('');
  const [plateNum, setPlateNum] = useState(0);
  const [plates, setPlates] = useState([]);
  // const [sum, setSum] = useState(0);

  const handleChangePlateVal = e => {
    setPlateVal(e.target.value);
  };

  const handlePlateTypeAdd = () => {
    const newPlates = [
      ...plates,
      {
        id: maxId,
        plateVal: plateVal,
        plateNum: plateNum
      }
    ];
    setPlates(
      newPlates.sort((m, n) => {
        return m.plateVal - n.plateVal;
      })
    );
    setMaxId(id => id + 1);
  };

  const handlePlateAdd = e => {
    setPlates(plates.map(item => {
        if (item.id === Number(e.target.dataset.id)) {
            return {
                ...item,
                plateNum: item.plateNum + 1
            };
        } else {
            return item;
        }
    }));
  };

  const handlePlateDel = e => {
    setPlates(plates.map(item => {
        if (item.id === Number(e.target.dataset.id)) {
            return {
                ...item,
                plateNum: item.plateNum - 1
            };
        } else {
            return item;
        }
    }));
  };

  return (
    <div>
      <label>
        <input type="text" name="title"
          value={plateVal} onChange={handleChangePlateVal} />
        円のお皿を
      </label>
      <button type="button"
        onClick={handlePlateTypeAdd}>追加</button>
      <hr />
      <ul>
        {plates.map(item => (
          <li key={item.id}>
            {item.plateVal}円皿が
            {item.plateNum}枚
            <button type="button"
              onClick={handlePlateAdd} data-id={item.id}>+
            </button>
            <button type="button"
              onClick={handlePlateDel} data-id={item.id}>-
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <p>
        合計：{plates.reduce((sum, plate) => {
          return sum + plate.plateVal * plate.plateNum;
        }, 0)}
      </p>
    </div>
  );
}