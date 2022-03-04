/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useQuery } from 'react-query';
import { Label } from '../../../types/common/types';

interface Props {
  label: string;
  setLabel: any;
}

interface GetAllLabelsQuery {
  Labels: Label[];
}

export default function LabelControl({ label, setLabel }: Props) {
  const getAllLabels = useQuery<GetAllLabelsQuery>('/get_all_labels');
  const onChangeHandle = async (val: string) => {
    setLabel(val);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      getOptionLabel={(option) => option.Name}
      options={getAllLabels.data?.Labels || []}
      value={null}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Vyne"
          variant="outlined"
          value={label}
          onChange={(ev) => {
            // dont fire API if the user delete or not entered anything
            if (ev.target.value !== '' || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
}
