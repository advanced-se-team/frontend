import AV from 'leancloud-storage/live-query';
import dayjs from 'dayjs';

export const useSubscription = () => {
  const isSubActive = () => AV.User.current()
    .get('isSubscriptionActive');

  return {
    isSubActive,
  };
};
export const isSubActive = () => {
  if (!AV.User.current()) {
    // AV.User.current().fetch();
    return false;
  }
  let result = false;
  try {
    result = dayjs()
      .isBefore(dayjs(AV.User.current()
        .get('subscribeAvailableUntil')));
  } catch (e) {
    // donothing
  }

  return result;
};

export const expireIn7Days = () => {
  let result = false;
  try {
    result = dayjs()
      .isAfter(dayjs(AV.User.current()
        .get('subscribeAvailableUntil'))
        .subtract(7, 'day')) && dayjs()
      .isBefore(dayjs(AV.User.current()
        .get('subscribeAvailableUntil'))
        .subtract(8, 'day'));
  } catch (e) {
    // donothing
  }

  return result;
};
export const expireFreeIn = () => {
  let result = false;
  try {
    result = dayjs(AV.User.current()
      .get('subscribeAvailableUntil')).diff(dayjs(), 'day');
    console.log(result);
    if (result > 10) return '有效';
  } catch (e) {
    // donothing
  }

  return `${result}天内过期`;
};

export const isTrailFromUser = () => !AV.User.current() || AV.User.current().get('subscribeCategory') === '体验版';

export const creatorIsTrail = (result) => result.get('createUser').get('subscribeCategory') === '体验版';
export const creatorIsEdu = (result) => result.get('createUser').get('subscribeCategory') === '教育版';
export const creatorExpired = (result) => dayjs().isAfter(dayjs(result.get('createUser').get('subscribeAvailableUntil')));

export const expireFreePro = () => isTrailFromUser();
