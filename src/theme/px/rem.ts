/* eslint-disable no-shadow */
const px = parseInt('16', 10);

const buildRem = (px: number) => (rem: number) => `${px * rem}px`;

export default buildRem(px);
