export function getHarvestAlertMsg(name: string, grain: number, vegetable: number) {
  return `[수확] ${name}\n채소 - ${vegetable}개\n곡식 - ${grain}개`;
}

export function get농장확장AlertMsg() {
  return `[농장 확장] 새로운 농장은 기존 농장과 인접한 곳에만 설치할 수 있습니다.`;
}

export const 농지예외Alert = `[농지] 농지가 이미 존재하는 경우, 기존 농지와 인접한 곳에만 설치할 수 있습니다.`;
