const fetch = require("node-fetch");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const { to, subject, text } = JSON.parse(event.body);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": "Bearer re_BCj6aL7Y_DMmsCnTiGr3fCMxqWmKvriNa",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "BE Warehouse <noreply@faisal-app.space>",
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
    }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
};
