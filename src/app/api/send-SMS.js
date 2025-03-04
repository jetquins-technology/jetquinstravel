import { Twilio } from 'twilio';

export default async function handler(req, res) {
    //deployed
    if (req.method === 'POST') {
        const { to, message } = req.body;

        // Ensure that all required fields are present
        if (!to || !message) {
            return res.status(400).json({ error: 'To and message fields are required' });
        }

        // Log the incoming data for debugging
        console.log('Sending message to:', to);
        console.log('Message:', message);

        // Twilio credentials from environment variables
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_PHONE_NUMBER;

        // Check if any credentials are missing
        if (!accountSid || !authToken || !from) {
            console.error('Twilio credentials missing!');
            return res.status(500).json({ error: 'Twilio credentials are missing or incorrect' });
        }

        try {
            const client = new Twilio(accountSid, authToken);
            console.log('Twilio Client Initialized', client);

            const messageResponse = await client.messages.create({
                body: message,
                from,
                to:"+916207891726", 
            });

            // Return success response
            return res.status(200).json({ success: true, sid: messageResponse.sid });
        } catch (error) {
            console.error('Error sending SMS:', error);
            console.error('Twilio Error Code:', error.code);
            console.error('Twilio Error Message:', error.message);
            console.error('Twilio Error More Info:', error.moreInfo);

            // Handle authentication error specifically
            if (error.code === 20003) {
                return res.status(401).json({ error: 'Authentication failed. Please check your Twilio credentials.' });
            }

            // Generic error handling
            return res.status(500).json({ error: 'Failed to send message', details: error.message });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}