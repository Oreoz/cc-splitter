import { helper } from '@ember/component/helper';

export function formatMoney(params) {
  return `${Number(params).toFixed(2)}$`;
}

export default helper(formatMoney);
