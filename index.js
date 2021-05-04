const fetch = require("node-fetch");
const notifier = require("node-notifier");

function getCenters(age, pinCode, date) {
  console.log(age, pinCode, date);

  return fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=04-05-2021`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "if-none-match": 'W/"18db-Zl7s9pbFz69B2QP2iVEmwt6G7GE"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1",
      },
      referrer: "https://www.cowin.gov.in/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const centers = res.centers;
      const validCenters = centers.filter((c) => {
        const validSessions = c.sessions.filter(
          (s) => s.min_age_limit == age && s.available_capacity
        );

        return !!validSessions.length;
      });

      return validCenters;
    });
}

const pad = (num, len, padStr) => String(num).padStart(len, padStr);

function trigger() {
  const [pinCode = 124001, age = 18] = process.argv.slice(2);
  const today = new Date();
  const date =
    pad(today.getDate(), 2, 0) +
    "-" +
    pad(today.getMonth() + 1, 2, 0) +
    "-" +
    today.getFullYear();

  const sec = 3;
  const sound = [
    "Basso",
    "Blow",
    "Bottle",
    "Frog",
    "Funk",
    "Glass", // ---
    "Hero",
    "Morse",
    "Ping",
    "Pop",
    "Purr",
    "Sosumi",
    "Submarine",
    "Tink",
  ];
  let ctr = 0;

  let intervalId = setInterval(async () => {
    console.log(` ========== Tick :: ${++ctr} =========`);
    const centers = await getCenters(age, pinCode, date);

    if (centers.length) {
      console.log(JSON.stringify(centers, null, 2));
      console.log(centers.length);
      notifier.notify(
        {
          title: "⚠️ VACCINE IS AVAILLABLE",
          message: `${centers.map((c) => ` 💉 ${c.name}`).join(", ")}`,
          sound: sound[5],
          wait: true,
          timeout: 1000,
        },
        function (err, response, metadata) {}
      );
      clearInterval(intervalId);
    }
  }, sec * 1000);
}

trigger();
