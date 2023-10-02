const amqp = require("amqplib");
const { Deepgram } = require("@deepgram/sdk");
const fs = require("fs");
const mime = require("mime-types");

const DEEPGRAM_API_KEY = "2446a30a7df0c12a9e9d43029c45cb60ed82e5cb";
const deepgram = new Deepgram(DEEPGRAM_API_KEY);

const consume = async (session_id) => {
  try {
    const connection = await amqp.connect(
      "amqps://ixvpyxdl:b90dNNIhRGXaeQQaNxKqpbLlEstuaOss@possum.lmq.cloudamqp.com/ixvpyxdl"
    );
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(session_id);

    return new Promise((resolve, reject) => {
        channel.consume(session_id, async (filepath) => {
          const filepathString = filepath.content.toString();
          try {
            const response = await deepgram.transcription.preRecorded({
              stream: fs.createReadStream(filepathString),
              mimetype: mime.contentType("webm"),
            });
            channel.ack(filepath);
            console.log("jobs gotten successfully")
            if (response.results.channels[0]){
              resolve(response.results.channels[0].alternatives[0].transcript);
            }else{
              resolve(false)
            }
            
          } catch (error) {
            console.error("Error during transcription:", error);
            channel.ack(filepath);
            
          }
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  consume,
};
