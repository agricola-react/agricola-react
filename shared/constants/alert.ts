export function getHarvestAlertMsg(name: string, grain: number, vegetable: number) {
  return `[수확] ${name}\n채소 - ${vegetable}개\n곡식 - ${grain}개`;
}

export function get농장확장AlertMsg() {
  return `[농장 확장] 새로운 농장은 기존 농장과 인접한 곳에만 설치할 수 있습니다.`;
}

export const 농지예외Alert = `[농지] 농지가 이미 존재하는 경우, 기존 농지와 인접한 곳에만 설치할 수 있습니다.`;

export const 외양간존재Alert = `[외양간 설치] 외양간이 이미 존재하는 칸에는 더이상 설치할 수 없습니다.`;

export const 외양간초과Alert = `[외양간 설치] 설치 가능한 최대 외양간 수를 초과했습니다.`;
