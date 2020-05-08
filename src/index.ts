import * as core from "@actions/core";
import * as rm from "typed-rest-client/RestClient";

const apiToken = core.getInput("api_token");
const scanId = core.getInput("scan");
const hostname = core.getInput("hostname");

const baseUrl = hostname ? `https://$hostname` : "https://nexploit.app";
let restc: rm.RestClient = new rm.RestClient("GitHub Actions", baseUrl);

async function stopScan(uuid: string) {
  try {
    let options = {
      additionalHeaders: { Authorization: `Api-Key ${apiToken}` },
    };
    let restRes = await restc.get(`api/v1/scans/${uuid}/stop`, options);

    switch (restRes.statusCode) {
      case 200: {
        core.info("Was succesfully stopped");
        break;
      }
      case 401: {
        core.setFailed("Failed to log in with provided credentials");
        break;
      }
      case 403: {
        core.setFailed(
          "The account doesn't have any permissions for a resource"
        );
        break;
      }
    }
  } catch (err) {
    console.debug("Can't stop the scan");
  }
}

stopScan(scanId);
