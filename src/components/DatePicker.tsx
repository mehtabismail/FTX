import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

export default ({open, onCancel, onConfirm}: any) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};
