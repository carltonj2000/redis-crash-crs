const appRoot = require("app-root-path");
const winston = require("winston");

const transports = [
  new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

const logToFile = true;
if (logToFile)
  transports.push(
    new winston.transports.File({
      filename: `${appRoot}/logs/app.log`,
      level: "info",
      maxsize: 1024,
      maxFiles: 2,
      format: winston.format.json()
    })
  );

const logger = new winston.createLogger({ transports, exitOnError: false });

logger.stream = {
  write: (message, encoding) => logger.info(message.trim())
};
module.exports = logger;
