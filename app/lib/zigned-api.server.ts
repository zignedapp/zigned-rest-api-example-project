import FormData from "form-data";
import * as fs from "fs";
import path from "path";
import axios, { AxiosResponse } from "axios";

// The Zigned API key specified in the .env file
const API_KEY = process.env.ZIGNED_API_KEY;

// The Zigned API base URL specified in the .env file
const API_BASE_URL = process.env.ZIGNED_API_BASE_URL;

async function ZignedApiFetch({
  method,
  endpoint,
  contentType,
  body,
}: {
  method: "GET" | "POST";
  endpoint: string;
  contentType: string;
  body?: object | FormData;
}): Promise<any> {
  if (typeof API_KEY === "undefined") {
    throw new Error("No Api Key specified");
  }

  if (contentType === "application/json" && typeof body !== "object") {
    throw new Error("Body must be an object");
  }

  const config = {
    method,
    url: `${API_BASE_URL}/${endpoint}`,
    headers: {
      "x-zigned-api-key": API_KEY,
      "Content-Type": contentType,
    },
    ...(Boolean(body) && { data: body }),
  };

  return axios(config).then((response) => response?.data);
}

export async function getAgreements(): Promise<any> {
  // Get all agreements created from a specified start date
  // The start date is set to today as an example
  // You can also omit the start_date param in order to get all agreements

  const date = new Date();

  return ZignedApiFetch({
    method: "GET",
    endpoint: `agreements?start_date=${date}`,
    contentType: "application/json",
  });
}

async function createAgreement(): Promise<{ id: string }> {
  const agreement = await ZignedApiFetch({
    method: "POST",
    endpoint: "agreements",
    contentType: "application/json",
    body: { issuer: "Zigned" },
  });

  return { id: agreement?.id };
}

async function uploadFile({
  id,
  filepath,
  filename,
}: {
  id: string;
  filepath: string;
  filename: string;
}): Promise<{ id: string }> {
  // Create an empty FormData object
  const formData = new FormData();

  // Create a stream from the file
  const file = fs.createReadStream(filepath);

  // append the file to the form data
  formData.append("file", file, filename);

  // IMPORTANT! Form Data headers can be a little bit sensitive as it usually includes the boundary. FormData automatically constructs this header, so we extract it and pass it the fetch function
  const contentType = formData.getHeaders()["content-type"];

  // Upload the file to the agreement
  const agreementWithFile = await ZignedApiFetch({
    method: "POST",
    endpoint: `agreements/${id}/file`,
    contentType,
    body: formData,
  });

  return { id: agreementWithFile?.id };
}

interface IAddSignIntentsProps {
  email: string;
  id: string;
}

async function addSignIntents({
  email,
  id,
}: IAddSignIntentsProps): Promise<{ id: string }> {
  const agreement = await ZignedApiFetch({
    method: "POST",
    endpoint: `agreements/${id}/signintents`,
    contentType: "application/json",
    body: { signintents: [email] },
  });

  return { id: agreement?.id };
}

interface ISendAgreementProps {
  id: string;
}

async function sendAgreement({
  id,
}: ISendAgreementProps): Promise<{ id: string }> {
  const agreement = await ZignedApiFetch({
    method: "POST",
    endpoint: `agreements/${id}/send`,
    contentType: "application/json",
  });

  return { id: agreement?.id };
}

// This is a wrapper function that creates an agreement, uploads a file, adds the sign intent and sends the agreement

interface ICreateAgreementProps {
  guessId: string;
  email: string;
}

export async function createAgreementFromGuess({
  guessId,
  email,
}: ICreateAgreementProps): Promise<{ id: string }> {
  try {
    const filepath = path.join(
      __dirname,
      "../app/temporary_files/",
      `${guessId}.pdf`
    );

    const filenameFromEmail = email.split("@")[0].replace(/[^a-z0-9@]/gi, "");

    const filenamePrettified = `gissning-${filenameFromEmail}.pdf`;

    const agreement = await createAgreement()
      .then(({ id }) =>
        uploadFile({ id, filepath, filename: filenamePrettified })
      )
      .then(({ id }) => addSignIntents({ email, id }))
      .then(({ id }) => sendAgreement({ id }));

    return { id: agreement.id };
  } catch (error) {
    throw new Error("Couldnt create agreement from guess");
  }
}
