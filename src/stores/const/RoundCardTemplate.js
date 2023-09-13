const 函数式生成环节配置 = (
  typeID,
  typeLabel,
  typeValue,
  formatString,
  timerCount,
  spokesmanCount,
  examples,
  useLongTime,
  useDuelTime,
  useSpokeTime,
  useDuelSpoke,
  positionDescription,
) => ({
  type: {
    id: typeID,
    label: typeLabel,
    value: typeValue,
  },
  formatString,
  timerCount,
  spokesmanCount,
  examples,
  uiComponent: {
    useLongTime,
    useDuelTime,
    useSpokeTime,
    useDuelSpoke,
  },
  ...(positionDescription ? { positionDescription } : {}),
});

export const noTimerConfig = { ...函数式生成环节配置(1, '无计时器', '2.1', '{t}', 0, 0, '例如：开场、致词、评委点评、结果揭晓、颁奖…', false, false, false, false) };
export const oneTimerConfig = { ...函数式生成环节配置(2, '单计时器', '2.2', '{t}', 1, 0, '例如：开篇陈词、驳论、小结、总结陈词…', true, false, false, false, '发言人 及 发言时长') };
export const twoTimerConfig = { ...函数式生成环节配置(3, '双计时器', '2.3', '{t}', 2, 0, '例如：对辩、自由辩论…', false, true, false, false) };
export const oneSideSpeechConfig = { ...函数式生成环节配置(4, '单方发言', '1.1', '{p1} · {t}', 1, 1, '例如：开篇陈词、质询小结、驳论、总结陈词…', false, false, true, false) };
export const oneSideArgueConfig = { ...函数式生成环节配置(5, '单方发问', '1.2', '{p1} · {t} · {p2}', 1, 2, '例如：质询、盘问…', true, false, false, true, '发问人 及 接受发问人') };
export const twoSideArgueConfig = { ...函数式生成环节配置(6, '双方对辩', '1.3', '{p1} · {t} · {p2}', 1, 2, '例如：对辩…', false, true, false, true, '发问人 及 接受发问人') };
export const twoSideFreeConfig = { ...函数式生成环节配置(7, '自由辩论', '1.4', '{t}', 2, 0, '例如：自由辩论…', false, true, false, false, '率先发言方') };

const 计时器环节模板 = [null, noTimerConfig, oneTimerConfig, twoTimerConfig, oneSideSpeechConfig, oneSideArgueConfig, twoSideArgueConfig, twoSideFreeConfig];
export const 从下标获取计时器环节模板 = (idx) => 计时器环节模板[idx];
export const 从值获取计时器环节模板 = (value) => {
  const mapp = {
    1.1: 4,
    1.2: 5,
    1.3: 6,
    1.4: 7,
    2.1: 1,
    2.2: 2,
    2.3: 3,
  };

  return 从下标获取计时器环节模板(mapp[value]);
};

export default 计时器环节模板;

// 以上的内容用于配置card有哪些组件
// 但是存储信息 不在这个template的功能范围内
// 我需要一个特定的结构，来存储每个部分的信息
// 首先思考我们需要存储什么信息？
// 模板：typeID；
// 标题：title，formatTitle；
// 计时：durationA, durationSB；【120】
// 发言人：spokesmanA, spokesmanB；【{label:'正方二辩',value:'1.2'}】
