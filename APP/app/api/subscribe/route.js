import mailchimp from "@mailchimp/mailchimp_marketing";

const apiKey = String(process.env.MAILCHIMP_API || process.env.NEXT_PUBLIC_MAILCHIMP_API);
const audienceId = String(process.env.MAILCHIMP_AUDIENCE || process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE); 
console.log(apiKey, audienceId, 'demKeys');

mailchimp.setConfig({
    apiKey: apiKey,
    server: 'us10', // Replace with your server region
  })
 

export async function POST(request) {
  const { email } = await request.json();
  console.log(email, 'mail registered')
  try {
    await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });

    return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), { status: 200 });
  } catch (error) {
    console.error('Mailchimp Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to subscribe. Please try again.' }), { status: 500 });
  }
}
