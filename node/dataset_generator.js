const constants = {};

constants.DATA_DIR = "../data";
constants.RAW_DIR = `${constants.DATA_DIR}/raw`;
constants.DATASET_DIR = `${constants.DATA_DIR}/dataset`;
constants.JSON_DIR = `${constants.DATASET_DIR}/json`;
constants.IMG_DIR = `${constants.DATASET_DIR}/img`;
constants.SAMPLES = `${constants.DATASET_DIR}/samples.json`;

const fs = require("fs");

const filenames = fs.readdirSync(constants.RAW_DIR);
const samples = [];

let id = 1;

filenames.forEach((f) => {
  const filename = `${constants.RAW_DIR}/${f}`;
  const { student, session, drawings } = JSON.parse(fs.readFileSync(filename));

  for (const label in drawings) {
    const sample = {
      id,
      label,
      username: student,
      user_id: session,
    };

    samples.push(sample);
    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
