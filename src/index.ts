import * as core from "@actions/core";
import * as rm from "typed-rest-client/RestClient";

const apiToken = core.getInput("api_token");
const scanId = core.getInput("scan");
const hostname = core.getInput("hostname");

const baseUrl = hostname ? `https://${hostname}` : "https://nexploit.app";
let restc: rm.RestClient = new rm.RestClient("GitHub Actions", baseUrl);

async function stopScan(uuid: string) {
  try {
    let options = {
      additionalHeaders: { Authorization: `Api-Key ${apiToken}` },
    };
    let restRes = await restc.get(`api/v1/scans/${uuid}/stop`, options);
    core.info("Was succesfully stopped");
  } catch (err: any) {
    core.setFailed(`Failed (${err.statusCode}) ${err.message}`);
  }
}

stopScan(scanId);
