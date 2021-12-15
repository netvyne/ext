import { Box } from '@mui/material';
import React from 'react';

interface Props {
  total: number;
  hidden?: boolean;
}

export default function VoteTotal({ total, hidden }: Props) {
  let value = '';
  if (total === 0 || hidden) {
    value = 'VOTE';
  } else {
    const digits = 1;
    const num = total;
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find((it) => num >= it.value);
    value = item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  }
  return (
    <Box
      width={42}
      textAlign="center"
    >
      {value}
    </Box>
  );
}

VoteTotal.defaultProps = {
  hidden: false,
};
