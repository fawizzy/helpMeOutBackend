const amqp = require("amqplib");

const publish = async (session_id, filepath) => {
  try {
    const connection = await amqp.connect(
      "amqps://ixvpyxdl:b90dNNIhRGXaeQQaNxKqpbLlEstuaOss@possum.lmq.cloudamqp.com/ixvpyxdl"
    );
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(session_id);
    channel.sendToQueue(session_id, Buffer.from(filepath));
    console.log("jobs sent succesfully");
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  publish,
};
