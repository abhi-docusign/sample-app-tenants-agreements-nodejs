const eSignSdk = require('docusign-esign');
const text = require('../../assets/public/text.json').sendAgreements.envelope;

function createSendAgreementsEnvelope(args) {

    let doc = new eSignSdk.Document.constructFromObject({
        documentBase64: args.docs,
        name: text.docName,
        fileExtension: 'pdf',
        documentId: '1',
    });

    let signer = eSignSdk.Signer.constructFromObject({
        email: args.signerEmail,
        name: args.signerName,
        recipientId: '1',
        clientUserId: args.signerClientId,
        routingOrder: '1',
    });

    let recipients = eSignSdk.Recipients.constructFromObject({
        signers: [signer],
    });

    return eSignSdk.EnvelopeDefinition.constructFromObject({
        emailSubject: text.emailSubject,
        documents: [doc],
        status: args.status,
        recipients: recipients,
    });
}

module.exports = {
    createSendAgreementsEnvelope,
};
