import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

web.listen(process.env.APP_PORT, () => {
  logger.info(`Server is running on port ${process.env.APP_PORT}`);
});
