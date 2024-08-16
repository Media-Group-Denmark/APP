import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
    apiKey: 'e3926bd48e709bb5c9299b375a4510c8-us10',
    server: 'us10', // Replace with your server region
  })

export async function POST(request) {
  const { email } = await request.json();

  try {
    await mailchimp.lists.addListMember('a2d80d4dd4', {
      email_address: email,
      status: 'subscribed',
    });

    return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to subscribe. Please try again.' }), { status: 500 });
  }
}
