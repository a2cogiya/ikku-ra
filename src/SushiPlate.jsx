import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ClearIcon from '@mui/icons-material/Clear';
import './SushiPlate.css';

export default function SushiPlate() {
  const [maxId, setMaxId] = useState(1);
  const [plateVal, setPlateVal] = useState('');
  const [plateNum, setPlateNum] = useState(0);
  const [plates, setPlates] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChangePlateVal = e => {
    setPlateVal(e.target.value);
  };

  const handleAddPlateType = () => {
    if (plateVal === '')
      return;

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

  const handleAddPlate = e => {
    setPlates(plates.map(item => {
      if (item.id === Number(e.currentTarget.dataset.id)) {
        return {
          ...item,
          plateNum: item.plateNum + 1
        };
      } else {
        return item;
      }
    }));
  };

  const handleDelPlate = e => {
    setPlates(plates.map(item => {
      if (item.id === Number(e.currentTarget.dataset.id)) {
        return {
          ...item,
          plateNum: item.plateNum >= 1 ? item.plateNum - 1 : 0
        };
      } else {
        return item;
      }
    }));
  };

  const handleDelPlateType = e => {
    setPlates(plates.filter(item =>
      item.id !== Number(e.currentTarget.dataset.id)
    ));
    setOpen(false);
  };

  const handleOpenDelPlateTypeDialog = () => {
    setOpen(true);

  }

  const handleCloseDelPlateTypeDialog = () => {
    setOpen(false);
  }

  return (
    <div>
      <TextField
        required
        label="お皿の値段"
        defaultValue=""
        variant="standard"
        onChange={handleChangePlateVal}
      />
      円のお皿を
      <Button variant="contained" startIcon={<AddCircleIcon />}
        onClick={handleAddPlateType}
      >
        追加
      </Button>
      <hr />
      <ul>
        {plates.map(item => (
          <li key={item.id}>
            {item.plateVal}円皿が
            {item.plateNum}枚
            <IconButton
              color="primary"
              onClick={handleAddPlate}
              data-id={item.id}
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handleDelPlate}
              data-id={item.id}
            >
              <RemoveCircleIcon />
            </IconButton>
            <IconButton
              color="warning"
              onClick={handleOpenDelPlateTypeDialog}
            >
              <ClearIcon />
            </IconButton>
            <Dialog open={open} onClose={handleOpenDelPlateTypeDialog}>
              <DialogTitle>削除の確認</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  本当にこのお皿全体を削除してもよろしいですか？この操作は取り消せません。
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDelPlateTypeDialog} autoFocus>キャンセル</Button>
                <Button onClick={handleDelPlateType} color="error" data-id={item.id}>削除</Button>
              </DialogActions>
            </Dialog>
          </li>
        ))}
      </ul>
      <hr />
      <p>
        お皿合計：{plates.reduce((sum, plate) => {
          return sum + plate.plateNum;
        }, 0)}
        <br />
        料金合計：{plates.reduce((sum, plate) => {
          return sum + plate.plateVal * plate.plateNum;
        }, 0)}
      </p>
    </div>
  );
}