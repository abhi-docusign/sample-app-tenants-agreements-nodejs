const { getEnvelopesList } = require('../docusign/envelope');
const { checkToken } = require('./jwtController');
const createController = async (req, res, next) => {
  await checkToken(req);

  // Construct arguments
  const { body } = req;

  console.log(body);

  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId
  };

  var envelopes = null;

  try {
    envelopes = await getEnvelopesList(args);
  } catch (error) {
    console.log('Error sending the envelope.');
    next(error);
  }

  if (envelopes) {
    res.status(200).send(envelopes);
  }

};

module.exports = {
  createController
};
