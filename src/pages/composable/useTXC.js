import TxcChangeLog from 'txc-change-log';

export const useTXC = () => {
  const txcChangeLog = new TxcChangeLog({ id: 297263 });

  const configureTXC = async () => {
    const res = await txcChangeLog.shouldModalShow();
    if (res) txcChangeLog.showModal();
  };

  return {
    configureTXC,
  };
};
