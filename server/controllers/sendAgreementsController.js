const { checkToken } = require('./jwtController');
const {
    createSendAgreementsEnvelope
} = require('../docusign/envelopes/sendAgreements');
const {
  getSenderViewURL,
  sendEnvelope
} = require('../docusign/envelope');

// Set constants
const signerClientId = '1000'; // The id of the signer within this application.

const dsReturnUrl = process.env.REDIRECT_URI + '/index';

const createController = async (req, res, next) => {
  // Check the access token, which will also update the token
  // if it is expired
  await checkToken(req);

  // Construct arguments
  const { body } = req;

  console.log(body);
  

  const envelopeArgs = {
    signerEmail: body.signerEmail,
    signerName: body.signerName,
    status: 'created',
    docs: body.docs,

    // Embedded signing arguments
    signerClientId: signerClientId,
    dsReturnUrl: dsReturnUrl,
  };
  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    envelopeArgs: envelopeArgs,
  };

  let results = null;

  // Send the envelope to signer
  try {
    // Step 1 end

    // Step 2 start
    // Get the envelope definition for the envelope
    const envelopeDef = createSendAgreementsEnvelope(args.envelopeArgs);
    // Step 2 end

    // Step 3 start
    // Send the envelope and get the envelope ID
    const envelopeId = await sendEnvelope(envelopeDef, args);
    // Step 3 end

    // Step 4 start
    // Get recipient view URL for embedded sending
    const viewUrl = await getSenderViewURL(envelopeId, args);

    // Set results
    results = { envelopeId: envelopeId, redirectUrl: viewUrl };
  } catch (error) {
    console.log('Error sending the envelope.');
    next(error);
  }

  if (results) {
    // Save envelope ID and signer name for later use
    req.session.envelopeId = results.envelopeId;
    req.session.signerName = body.signerName;

    // Send back redirect URL for embedded sending
    res.status(200).send(results.redirectUrl);
    // Step 4 end
  }
};

module.exports = {
  createController
};
