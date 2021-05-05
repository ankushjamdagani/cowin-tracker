const fetch = require("node-fetch");

function getCenters(age, pinCode, date) {
  return fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${date}`,
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

let ctr = 0;
async function initSearch(options, callback) {
  const { date, pinCode, age, sec } = options;

  console.log(` ========== Tick :: ${++ctr} =========`);
  const centers = await getCenters(age, pinCode, date);

  if (centers.length) {
    const message = `${centers.map((c) => ` 💉 ${c.name}`).join("\n")}`;
    callback(message);
  }

  setTimeout(() => {
    initSearch(options, callback);
  }, sec * 1000);
}

module.exports = { initSearch };
