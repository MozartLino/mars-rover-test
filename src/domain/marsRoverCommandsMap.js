const marsRoverCommandsMap = {
  NL: { method: 'moveSideways', params: 'W' },
  NR: { method: 'moveSideways', params: 'E' },
  EL: { method: 'moveSideways', params: 'N' },
  ER: { method: 'moveSideways', params: 'S' },
  SL: { method: 'moveSideways', params: 'E' },
  SR: { method: 'moveSideways', params: 'W' },
  WL: { method: 'moveSideways', params: 'S' },
  WR: { method: 'moveSideways', params: 'N' },
  NM: { method: 'moveForward', params: [0, 1] },
  EM: { method: 'moveForward', params: [1, 0] },
  SM: { method: 'moveForward', params: [0, -1] },
  WM: { method: 'moveForward', params: [-1, 0] },
};

module.exports = marsRoverCommandsMap;
