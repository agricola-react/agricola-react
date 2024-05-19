export function getHarvestAlertMsg(name: string, grain: number, vegetable: number) {
  return `[수확] ${name}\n채소 - ${vegetable}개\n곡식 - ${grain}개`;
}
