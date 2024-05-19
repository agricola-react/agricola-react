import { SlotValue } from '../recoil';

export const FIELD: SlotValue = {
  type: '밭',
  resource: null,
  count: 0,
};

export const INIT_GRAIN: SlotValue = {
  ...FIELD,
  resource: '곡식',
  count: 3,
};

export const INIT_VEGETABLE: SlotValue = {
  ...FIELD,
  resource: '채소',
  count: 2,
};
