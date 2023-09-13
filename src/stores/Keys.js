import {forEach} from "lodash-es";

export const 正方标识符 = Symbol('正方');
export const 反方标识符 = Symbol('反方');
export const 初始标识符 = Symbol('初始');
export const 获得另一方标识符 = (标识符) => {
  if (标识符 === 正方标识符) {
    return 反方标识符;
  }

  return 正方标识符;
};
export const 从描述获得标识符 = (描述) => {
  if (描述 === 正方标识符.description) {
    return 正方标识符;
  }
  if (描述 === 初始标识符.description) {
    return 初始标识符;
  }

  return 反方标识符;
};

export const 默认界面参数 = () => {
  const props = {
    值: {
      水印: {
        b使用: false,
        bottom: 20,
        width: 240,
        height: 46,
        paddingLeft: 2,
        paddingRight: 10,
        imgSize: 40,
        fontMT: -4
      },
      字体: {
        xl3: 30,
        xl4: 36,
        xl6: 60,
      },
      边距: {
        m1: 4,
        m2: 8,
        m3: 12,
        m4: 16,
        m5: 20,
      },
      横幅: {
        b使用: false,
        高度: 100,
        字体高度: 80,
        圆角: 10,
        边框: 2,
      },
      计时: {
        顶部top: 520,
        小倒计时字号: 80,
      },
      下方为在表单中可配置项: {},
      横条背景: {
        顶部top: 76,
        正方底色: '#b32525',
        反方底色: '#0369a1',
      },
      辩题两行: {
        两行宽度: 600,
      },
      辩题: {
        顶部top: 105,
        左右: 166,
        字号: 36,
        字体颜色: '#ffffff',
      },
      双方: {
        顶部top: 190,
        左右: 20,
        字号: 30,
        字体颜色: '#ffffff',
      },
      比赛名: {
        b使用: false,
        顶部top: 259,
        字号: 76,
        字体颜色: '#0369a1',
      },
      有计时环节名称: {
        顶部top: 370,
        字号: 96,
        字体颜色: '#ffffff',
      },
      没计时环节名: {
        顶部top: 500,
        字号: 160,
      },
      单计时器: {
        顶部top: 520,
        字号: 288,
        字体颜色: '#ffffff',
      },
      双计时器: {
        字号: 60,
        中间空白: 200,
        正方字体颜色: '#b32525',
        反方字体颜色: '#0369a1',
      },
    },
  };

  return { ...props };
};

export const 补足参数差距 = (传入参数) => {
  const 参数默认值 = 默认界面参数()
  forEach(传入参数.值, (value0, key0) => {
    forEach(value0, (value, key) => {
      try{
        参数默认值.值[key0][key] = 传入参数.值[key0][key]}
      catch (e) {
        console.log(key0,key)}
    })
  })
  return 参数默认值
}
