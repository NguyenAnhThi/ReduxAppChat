import SendBird from "sendbird";

const fetchChannels = dispatch => () => {
  const payload = new Promise((resolve, reject) => {
    sendbird.OpenChannel.createOpenChannelListQuery().next((ch, err) => {
      resolve(ch);
    });
  });
  return dispatch({
    type: "FETCH_CHANNELS",
    payload
  });
};

const sendbird = new SendBird({
  appId: "4C3585C4-08F4-4269-8F7E-8A31A0EC2483"
});

export default function mapDispatchToProps(dispatch) {
  return {
    connect: userId => {
      const payload = new Promise((resolve, reject) => {
        sendbird.connect(userId, (u, err) => {
          resolve(u);
        });
      });
      return dispatch({
        type: "CONNECTION",
        payload
      }).then(fetchChannels(dispatch));
    },

    createChannel: name => {
      const payload = new Promise((resolve, reject) => {
        sendbird.OpenChannel.createChannel(name, name, "", (ch, err) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          return dispatch({
            type: "CREATE CHANNEL",
            channel: ch
          });
        });
      });
    },

    selectChannel: ch => {
      dispatch({
        type: "SELECT_CHANNEL",
        channel: ch
      });
    }
  };
}
