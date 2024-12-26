const eSignSdk = require('docusign-esign');

/**
 * Sends an envelope using the Envelopes::create API method.
 * 
 * @param {Object} envelopeDefinition - The envelope definition to send.
 * @param {Object} args - The object containing the authentication information and other arguments.
 * @param {string} args.accessToken - The access token for authentication.
 * @param {string} args.accountId - The account ID associated with the envelope.
 * @param {string} args.basePath - The base path for the API requests.
 * @returns {Promise<string>} - A promise that resolves with the envelopeId.
 */
const sendEnvelope = async (envelopeDefinition, args) => {
  // Create API client to call
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  let results = null;

  // Call Envelopes::create API method
  // Exceptions will be caught by the calling function
  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelopeDefinition,
  });

  let envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return envelopeId;
};

/**
 * Retrieves the sender view URL for an envelope.
 *
 * @param {string} envelopeId - The ID of the envelope for which to create the sender view.
 * @param {object} args - Contains necessary authentication information and envelope arguments.
 * @param {string} args.accessToken - The access token for authentication.
 * @param {string} args.basePath - The base path for the API requests.
 * @param {string} args.accountId - The account ID associated with the envelope.
 * @param {object} args.envelopeArgs - Additional arguments for the envelope.
 * @param {string} args.envelopeArgs.dsReturnUrl - The URL to return to after the sender view is closed.
 * @returns {Promise<string>} - A promise that resolves with the URL for the sender view.
 */

const getSenderViewURL = async (envelopeId, args) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);

  const viewRequest = new eSignSdk.EnvelopeViewRequest.constructFromObject({
    returnUrl: args.envelopeArgs.dsReturnUrl,
    viewAccess: 'envelope',
    settings: new eSignSdk.EnvelopeViewSettings.constructFromObject({
      startingScreen: 'Tagger',
      sendButtonAction: 'send',
      showBackButton: 'false',
      backButtonAction: 'previousPage',
      showHeaderActions: 'false',
      showDiscardAction: 'false',
      lockToken: ''
    })
  });

  let senderView = await envelopesApi.createSenderView(
    args.accountId,
    envelopeId,
    {
      envelopeViewRequest: viewRequest,
    }
  );

  return senderView.url;
};

/**
 * Retrieves a list of envelopes based on the given options.
 * @param {object} args - contains the necessary authentication information
 * @returns {Promise<Array<eSignSdk.EnvelopeSummary>>} - A promise that resolves with an array of envelope summaries.
 */
const getEnvelopesList = async (args) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  const options = {
    fromDate: "2024-01-01T00:00:00Z",
    status: "sent",
  };
  try {
    const envelopes = await envelopesApi.listStatusChanges(process.env.API_ACCOUNT_ID, options);
    console.log("Envelopes retrieved:", envelopes.envelopes);
    return envelopes.envelopes;
  } catch (error) {
    console.error("Error fetching envelopes:", error);
  }
}

module.exports = {
  sendEnvelope,
  getSenderViewURL,
  getEnvelopesList
};
