import { prismaClient } from "../application/database.js";
import moment from "moment-timezone";
// import { parseISO } from "date-fns";
moment.tz.setDefault("Asia/Jakarta");

const createDataSensor = async (req, res) => {
  try {
    const { detakJantung, kelembapanKulit } = req.query;
    // const { detakJantung, kelembapanKulit } = req.body;

    const tanggal = moment.tz(new Date(), "Asia/Jakarta");

    const result = await prismaClient.save.create({
      data: {
        detak_jantung: detakJantung,
        kelembapan_kulit: kelembapanKulit,
        tanggal: tanggal.toDate(),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi Kesalahan saat create data");
  }
};

const updateSensorMonitoring = async (req, res) => {
  try {
    // const { id } = req.params.id;
    const { detak_jantung, kelembapan_kulit } = req.query;

    const tanggal = Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });

    const result = await prismaClient.sensor.update({
      where: {
        // id: id,
        id: req.params.id,
      },
      data: {
        detak_jantung: detak_jantung,
        kelembapan_kulit: kelembapan_kulit,
        tanggal: tanggal,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat memperbarui data");
  }
};

export default { updateSensorMonitoring, createDataSensor };
